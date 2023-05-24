const buildCommentTree = (comments) => {
  const commentDict = {};
  const rootComments = [];

  // Crear un diccionario de comentarios usando el ID como clave
  for (const comment of comments) {
    commentDict[comment.id] = comment;
  }

  // Organizar los comentarios en la estructura de árbol
  for (const comment of comments) {
    const parentId = comment.comentarioPadreId;
    if (parentId) {
      const parentComment = commentDict[parentId];
      parentComment.hijos = parentComment.hijos || [];
      parentComment.hijos.push(comment);
    } else {
      rootComments.push(comment);
    }
  }

  return rootComments;
};

module.exports = {
  buildCommentTree,
};
