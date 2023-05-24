function buildCommentTree(comments) {
  const commentDict = {};
  const rootComments = [];

  // Ordenar los comentarios en orden ascendente según la fecha de creación
  const sortedComments = comments.sort(
    (a, b) => new Date(a.fechaCreado) - new Date(b.fechaCreado)
  );

  // Crear un diccionario de comentarios usando el ID como clave
  for (const comment of sortedComments) {
    comment.hijos = [];
    commentDict[comment.id] = comment;
  }

  // Organizar los comentarios en la estructura de árbol
  for (const comment of sortedComments) {
    const parentId = comment.comentarioPadreId;
    if (parentId) {
      const parentComment = commentDict[parentId];
      if (parentComment) {
        parentComment.hijos.push(comment);
      }
    } else {
      rootComments.push(comment);
    }
  }

  return rootComments;
}

module.exports = {
  buildCommentTree,
};
