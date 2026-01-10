import { useState } from "react";

interface OtpFormProps {
  onVerify: (otp: string) => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Verify OTP
      </button>
    </form>
  );
};

export default OtpForm;
