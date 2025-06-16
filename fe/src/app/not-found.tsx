import { Button, Result } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang không tồn tại nha"
            extra={
              <Button type="primary">
                <Link href={"/dashboard"}>Trờ về Dashboard</Link>
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
}
