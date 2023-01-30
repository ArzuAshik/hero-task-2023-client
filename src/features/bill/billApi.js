import { errorAlert } from "../../utils";
import { apiSlice } from "../Api/apiSlice";

const billApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBill: builder.mutation({
      query: (body) => ({
        url: `/add-billing`,
        method: "POST",
        body,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { search, page, ...rest } = arg;
        const _id = "loading" + Math.random();
        const draft = dispatch(
          billApi.util.updateQueryData(
            "getBills",
            { search, page },
            (draft) => {
              draft.data = [{ _id, ...rest, loading: true }, ...draft.data];
              if (draft.data.length > 10) draft.data.length = 10;
              draft.paidTotal =
                Number(draft.paidTotal) + Number(arg.paidAmount);
              draft.totalPage = Math.ceil(
                (Number(draft.documentCount) + 1) / 10
              );
              draft.documentCount = Number(draft.documentCount) + 1;
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          if (data._id) {
            dispatch(
              billApi.util.updateQueryData(
                "getBills",
                { search: "", page },
                (draft) => {
                  const target = draft.data.find((item) => item._id === _id);
                  target._id = data._id;
                  target.loading = false;
                }
              )
            );
          }
        } catch (err) {
          draft.undo();
        }
      },
    }),

    updateBill: builder.mutation({
      query: ({ _id, body }) => ({
        url: `/update-billing/${_id}`,
        method: "PATCH",
        body,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { search, page, body, _id } = arg;
        const draft = dispatch(
          billApi.util.updateQueryData(
            "getBills",
            { search, page },
            (draft) => {
              const target = draft.data.find((item) => item._id === _id);
              draft.paidTotal =
                Number(draft.paidTotal) -
                Number(target.paidAmount) +
                Number(body.paidAmount);
              Object.assign(target, body);
              // target = body;
              target.loading = true;
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          if (data.errors) draft.undo();
          else
            dispatch(
              billApi.util.updateQueryData(
                "getBills",
                { search, page },
                (draft) => {
                  const target = draft.data.find((item) => item._id === _id);
                  target.loading = false;
                }
              )
            );
        } catch (err) {
          draft.undo();
        }
      },
    }),

    getBills: builder.query({
      query: ({ search = "", page = 1 }) => ({
        url: `/billing-list?page=${page}&search=${search}`,
      }),
      keepUnusedDataFor: 0.1,
    }),

    deleteBill: builder.mutation({
      query: ({ _id }) => ({
        url: `/delete-billing/${_id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { search, page, _id } = arg;
        const draft = dispatch(
          billApi.util.updateQueryData(
            "getBills",
            { search, page },
            (draft) => {
              let paidAmount;
              draft.data = draft.data.filter((item) => {
                if (item._id !== _id) return true;
                paidAmount = item.paidAmount;
                return false;
              });
              const docCount = Number(draft.documentCount) - 1;
              draft.paidTotal = Number(draft.paidTotal) - Number(paidAmount);
              draft.documentCount = docCount;
              draft.totalPage = Math.ceil(docCount / 10);
            }
          )
        );
        try {
          const { data } = await queryFulfilled;
          if (!data.deletedCount) {
            draft.undo();
            errorAlert("Delete Failed.");
          }
        } catch (err) {
          draft.undo();
          errorAlert("Network Error! Delete Failed.");
        }
      },
    }),
  }),
});

export const {
  useGetBillsQuery,
  useAddBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,
} = billApi;
