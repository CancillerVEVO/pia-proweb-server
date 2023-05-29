const { prisma } = require("../../database/prisma");
const tmdb = require("../../tmdb");
const {
  NotFoundError,
  ForbiddenError,
} = require("../../handlers/errors/AppError");

const getProfile = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
    include: {
      Critica: true,
    },
  });

  if (!user) {
    throw NotFoundError.create("El usuario no existe");
  }

  const reviews = user.Critica;

  const movies = await Promise.all(
    reviews.map(async (review) => {
      const pelicula = await tmdb.getMovieDetails({
        movieId: review.pelicula,
      });
      return pelicula;
    })
  );

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      biografia: user.biografia,
      fechaCreacion: user.fecha_creado,
      fechaActualizacion: user.fecha_actualizado,
      reviews: reviews.map((review, index) => ({
        id: review.id,
        titulo: review.titulo_critica,
        contenido: review.contenido,
        calificacion: review.calificacion,
        fechaCreacion: review.fecha_creado,
        pelicula: movies[index],
      })),
    },
  };
};
const updateProfile = async (userId, { nombre, biografia }) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw NotFoundError.create("El usuario no existe");
  }

  const isForbidden = user.id !== userId;

  if (isForbidden) {
    throw ForbiddenError.create(
      "No tienes permiso para actualizar este perfil"
    );
  }

  const nameAlreadyTaken = await prisma.usuario.findUnique({
    where: {
      nombre,
    },
  });

  if (nameAlreadyTaken && nameAlreadyTaken.id !== userId) {
    throw ForbiddenError.create("El nombre de usuario ya está en uso");
  }

  const updatedUser = await prisma.usuario.update({
    where: {
      id: userId,
    },
    data: {
      nombre,
      biografia,
      fecha_actualizado: new Date(),
    },
  });

  return {
    user: {
      id: updatedUser.id,
      nombre: updatedUser.nombre,
      biografia: updatedUser.biografia,
      fechaCreacion: updatedUser.fecha_creado,
      fechaActualizacion: updatedUser.fecha_actualizado,
    },
  };
};
const getFavorites = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: userId,
    },
    include: {
      Favorito: {
        include: {
          Critica: {
            include: {
              Usuario: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw NotFoundError.create("El usuario no existe");
  }

  if (!user.Favorito) {
    return {
      user: {
        id: user.id,
        nombre: user.nombre,
        biografia: user.biografia,
        fechaCreacion: user.fecha_creado,
        fechaActualizacion: user.fecha_actualizado,
        favoritos: [],
      },
    };
  }

  const reviews = user.Favorito.map((favorite) => ({
    id: favorite.critica_id,
    pelicula: favorite.Critica.pelicula,
    titulo: favorite.Critica.titulo_critica,
    contenido: favorite.Critica.contenido,
    calificacion: favorite.Critica.calificacion,
    fechaCreacion: favorite.Critica.fecha_creado,
    autor: {
      id: favorite.Critica.Usuario.id,
      nombre: favorite.Critica.Usuario.nombre,
      email: favorite.Critica.Usuario.email,
    },
    fechaFavoriteado: favorite.fecha_creado,
  }));

  const movies = await Promise.all(
    reviews.map(async (review) => {
      const pelicula = await tmdb.getMovieDetails({
        movieId: review.pelicula,
      });
      return pelicula;
    })
  );

  const cleanData = reviews.map((review, index) => ({
    reseña: {
      ...review,
      pelicula: movies[index],
    },
  }));

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      biografia: user.biografia,
      fechaCreacion: user.fecha_creado,
      fechaActualizacion: user.fecha_actualizado,
      favoritos: cleanData,
    },
  };
};

module.exports = {
  getProfile,
  updateProfile,
  getFavorites,
};
