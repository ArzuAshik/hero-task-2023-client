const { apiSlice } = require("../Api/apiSlice");

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
              console.log(JSON.stringify(draft));
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
  }),
});

export const { useGetBillsQuery, useAddBillMutation, useUpdateBillMutation } =
  billApi;
