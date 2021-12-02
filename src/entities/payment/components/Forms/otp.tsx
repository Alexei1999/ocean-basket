import Alert from "@shared/alert";
import Button from "@shared/button";
import { SetStateAction, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Label from "./forms/label";

interface OTPProps {
  defaultValue: string | undefined;
  onVerify: (phoneNumber: string) => void;
}
export const OTP: React.FC<OTPProps> = ({ defaultValue, onVerify }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [number, setNumber] = useState(defaultValue ?? "");
  const [otp, setOtp] = useState("");
  const [hasOTP, setHasOTP] = useState(false);
  const [otpId, setOtpId] = useState("");

  const { mutate: verifyOtpCode, isLoading: otpVerifyLoading } = {
    mutate: () => {},
    isLoading: false,
  } as any;
  const { mutate: sendOtpCode, isLoading: loading } = {
    mutate: () => {},
    isLoading: false,
  } as any;

  function onSendCodeSubmission() {
    sendOtpCode(
      {
        phone_number: number,
      },
      {
        onSuccess: (data: {
          success: any;
          sendOtpCode: { id: SetStateAction<string> };
          message: SetStateAction<string | null>;
        }) => {
          if (data?.success) {
            setHasOTP(true);
            setOtpId(data?.sendOtpCode?.id!);
          }
          if (!data?.success) {
            console.log("text-otp-failed");
            setErrorMessage(data?.message);
          }
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }

  function onVerifyCodeSubmission() {
    verifyOtpCode(
      {
        phone_number: number,
        code: otp,
        otp_id: otpId,
      },
      {
        onSuccess: (data: {
          success: any;
          message: SetStateAction<string | null>;
        }) => {
          if (data?.success) {
            onVerify(number);
          } else {
            setErrorMessage(data?.message);
          }
          setHasOTP(false);
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }

  return (
    <>
      {!hasOTP ? (
        <div className="flex items-center">
          <PhoneInput
            country={"us"}
            value={number}
            onChange={(phone) => setNumber(`+${phone}`)}
            inputClass="!p-0 !pe-4 !ps-14 !flex !items-center !w-full !appearance-none !transition !duration-300 !ease-in-out !text-body !text-sm focus:!outline-none focus:!ring-0 !border !border-border-base !border-e-0 !rounded !rounded-e-none focus:!border-accent !h-12"
            dropdownClass="focus:!ring-0 !border !border-border-base !shadow-350"
          />
          <Button
            loading={loading}
            disabled={loading}
            onClick={onSendCodeSubmission}
            className="!rounded-s-none"
          >
            {"text-send-otp"}
          </Button>
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-5">
          <Label className="md:mb-0">{"text-otp-code"}</Label>
          Mobile otp input
          <Button
            loading={otpVerifyLoading}
            disabled={otpVerifyLoading}
            onClick={onVerifyCodeSubmission}
          >
            {"text-verify-code"}
          </Button>
        </div>
      )}

      {errorMessage && (
        <Alert
          variant="error"
          message={errorMessage}
          className="mt-4"
          closeable={true}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </>
  );
};
