// How to read data from Firebase Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/get-data
// https://firebase.google.com/docs/firestore/query-data/queries
// e.g. Ref.where("population", ">", 100000).orderBy("population").limit(2)
// NOTE: If you include a filter with a range comparison, your first ordering must be on the same field
// For complex queries, create a firestore composite index

// CRUD example: https://bezkoder.com/react-firestore-crud/

const getAllMessagesByField = ({
  collectionRef,
  orderColumn = 'createdAt',
  limit = 50,
  field,
}) => {
  if (field.name && field.value) {
    return collectionRef
      .where(field.name, '<=', field.value)
      .where(field.name, '>=', field.value)
      .orderBy(field.name, 'asc')
      .orderBy(orderColumn, 'asc')
      .limit(limit);
  }

  return collectionRef.orderBy(orderColumn).limit(limit);
};

export const sendMessage = async (collectionRef, message) => {
  const {
    text,
    senderId,
    receiverId,
    createdAt = new Date(),
    read = false,
  } = message;

  if (text && text.trim() && senderId && receiverId) {
    const result = await collectionRef.add({
      text,
      senderId,
      receiverId,
      createdAt,
      read,
    });

    return result;
  }
};

export const collectionConfig = {
  idField: 'id',
};

export default getAllMessagesByField;
