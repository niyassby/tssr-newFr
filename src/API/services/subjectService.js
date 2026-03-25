import axiosInstance from "../axiosConfig";
import { API_ENDPOINTS } from "../apiEndpoints";

export const subjectServices = {
  getSubjects: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.COURSE.GET_SUB);
    return response.data;
  },
  getAllTrueAndFalseSubjects: async () => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.SUBJECTS.GET_ALL_SUBJECTS
    );
    return response.data;
  },
  createSubjects: async (data) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SUBJECTS.CREATE_SUBJECTS,
      data
    );
    return response.data;
  },
  updateSubjects: async (data) => {
    const { id, ...bodyData } = data;
    const response = await axiosInstance.put(API_ENDPOINTS.SUBJECTS.UPDATE_SUBJECTS, Object.keys(bodyData).length > 0 ? bodyData : {}, {
      params: {
        id: id,
      },
    });
    return response.data;
  },

};
