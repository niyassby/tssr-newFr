import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const eventService = {
  getAllEvents: async (search) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENT.GET_ALL_EVENTS,
      {
        params: {activeOnly: false, search}
      }
    );
    return response.data;
  },
  getEventData: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENT.GET_EVENT_DATA,
      {
        params: {eventId:id}
      }
    );
    return response.data;
  },
  getEventRecords: async (data) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENT.GET_EVENT_RECORDS,
      {
        params: data
      }
    );
    return response.data;
  },
  updateEventRecords: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT.UPDATE_EVENT_RECORDS,
      data
    )
    return response.data;
  },
  createEvent: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.EVENT.CREATE_EVENT,
      data
    )
    return response.data;
  },
  updateEvent: async (data, id) => {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.EVENT.UPDATE_EVENT}/${id}`,
      data,
    )
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await axiosInstance.delete(
     API_ENDPOINTS.EVENT.DELETE_EVENT,
     {
      params: {id}
     }
    )
    return response.data;
  },
  downloadEventRecords: async (data) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.EVENT.DOWNLOAD_EVENT_RECORDS,
      {
        params: data
      }
    )
    return response.data;
  }
};
