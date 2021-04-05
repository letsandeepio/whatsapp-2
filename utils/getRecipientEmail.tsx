export const getRecipientEmail = (users, userLoggedIn) =>
  users?.find((userToFilter) => userToFilter !== userLoggedIn?.email);
