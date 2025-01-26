import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReferral } from "../api";
import { CreateReferralRequest } from "../types";

import FormInputField from "@/forms/FormInputField";
import FormFileInput from "@/forms/FormFileInput";
import CustomButton from "@/custom/CustomButton";

const ReferralForm = () => {
  const [avatarFileName, setAvatarFileName] = useState<string>("");

  const queryClient = useQueryClient();

  const methods = useForm<CreateReferralRequest>({
    defaultValues: {
      givenName: "",
      surname: "",
      email: "",
      phone: "",
      homeName: "",
      street: "",
      suburb: "",
      state: "",
      postcode: "",
      country: "",
      avatar: "",
    }
  });

  const { mutate, status } = useMutation({
    mutationFn: createReferral,
    onSuccess: () => {
      methods.reset();
      setAvatarFileName("");
      queryClient.invalidateQueries({
        queryKey: ["referrals"]
      });
    },
    onError: (error) => {
      console.log("Error occured in create referral", error);
    }
  });

  const onSubmit = (data: CreateReferralRequest) => {
    mutate(data);
  };

  const isCreateReferralLoading = status === "pending";

  return (
    <div className="md:lg-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        Referral Builder
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p className="text-sm text-gray-400 font-bold mt-4">
            PERSONAL DETAILS
          </p>
          <hr className="border-1 mt-2 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <FormInputField name="givenName" label="GIVEN NAME" disabled={isCreateReferralLoading} />
            <FormInputField name="surname" label="Surname" disabled={isCreateReferralLoading} />
            <FormInputField name="email" label="EMAIL" disabled={isCreateReferralLoading} />
            <FormInputField name="phone" label="PHONE" disabled={isCreateReferralLoading} />
          </div>

          <p className="text-sm text-gray-400 font-bold mt-8">
            ADDRESS
          </p>
          <hr className="border-1 mt-2 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <FormInputField name="homeName" label="HOME NAME OR #" disabled={isCreateReferralLoading} />
            <FormInputField name="street" label="STREET" disabled={isCreateReferralLoading} />
            <FormInputField name="suburb" label="SUBRB" disabled={isCreateReferralLoading} />
            <FormInputField name="state" label="STATE" disabled={isCreateReferralLoading} />
            <FormInputField name="postcode" label="POSTCODE" disabled={isCreateReferralLoading} />
            <FormInputField name="country" label="COUNTRY" disabled={isCreateReferralLoading} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-6">
            <FormFileInput name="avatar" fileName={avatarFileName} setFileName={setAvatarFileName} disabled={isCreateReferralLoading} />
            <CustomButton type="success" label="CREATE REFERRAL" loading={isCreateReferralLoading} />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ReferralForm;
