import API from "./api";

export const registerForEvent = async (eventId, role) => {
  if (!role) throw new Error("Please select a role");

  const response = await API.post(`/applications/events/${eventId}/register`, {
    role,
  });

  return response.data;
};
