import { useQuery } from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { fetchReferrals } from "../api";
import { GetReferralsData } from "../types";

import CustomCardTable, { CustomCardTableListColumns } from "@/custom/CustomCardTableList";
import CustomActionIconButton from "@/custom/CustomActionIconButton";

interface CustomColumns extends GetReferralsData {
  actions?: string;
}

const ReferralTableList = () => {
  const { isFetching, data } = useQuery({
    queryKey: ["referrals"],
    queryFn: () => fetchReferrals(),
  });

  const onClickEdit = (item: GetReferralsData) => {
    console.log("EDIT", item);
  };

  const onClickDelete = (item: GetReferralsData) => {
    console.log("DELETE", item);
  };

  const columns: CustomCardTableListColumns<CustomColumns>[] = [
    { key: "givenName", headerName: "GIVEN NAME" },
    { key: "surname", headerName: "SURNAME" },
    { key: "email", headerName: "EMAIL" },
    { key: "phone", headerName: "PHONE" },
    {
      key: "actions", headerName: "ACTIONS", render: (item: GetReferralsData) => (
        <div className="flex space-x-5">
          <CustomActionIconButton
            icon={<PencilIcon className="w-5 h-5" />}
            onClick={() => onClickEdit(item)}
          />
          <CustomActionIconButton
            icon={<TrashIcon className="w-5 h-5" />}
            onClick={() => onClickDelete(item)}
          />
        </div>
      )
    },
  ];

  return (
    <div>
      <CustomCardTable
        columns={columns}
        data={data?.data || []}
        loading={isFetching}
      />
    </div>
  )
}

export default ReferralTableList;
