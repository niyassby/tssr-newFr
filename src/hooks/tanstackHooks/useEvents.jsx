import { eventService } from "@/API/services/eventService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllEvents = (search) => {
  return useQuery({
    queryKey: ["events",search],
    queryFn: () => eventService.getAllEvents(search),
    keepPreviousData: true,
  });
};

export const useEventData = (id) => {
  return useQuery({
    queryKey: ["eventData",id],
    queryFn: () => eventService.getEventData(id),
    keepPreviousData: true,
  });
};

export const useCreateEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return eventService.createEvent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });
}

export const useUpdateEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }) => {
      return eventService.updateEvent(data, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });
}

export const useDeleteEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return eventService.deleteEvent(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("events");
    },
  });
}


export const useEventRecords = (eventId, payStatus, page, search, limit) => {
  return useQuery({
    queryKey: ["eventRecords", eventId,payStatus,page,search,limit],
    queryFn: () => eventService.getEventRecords({eventId, payStatus, page, search, limit}),
    keepPreviousData: true,
  });
};

export const useUpdateEventRecords = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return eventService.updateEventRecords(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("eventRecords");
    },
  });
}

export const useDownloadEventRecords = (data, enabled) => {
  return useQuery({
    queryKey: ["eventRecordsForDownload", data],
    queryFn: () => eventService.downloadEventRecords(data),
    keepPreviousData: true,
    enabled: !!enabled,
  });
}