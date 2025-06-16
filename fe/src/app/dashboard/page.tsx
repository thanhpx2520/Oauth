"use client";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { signOut, useSession } from "next-auth/react";

function Dashboard() {
  const { data: session } = useSession();

  if (session?.user?.email) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  style={{ backgroundColor: "#f0f0f0" }}
                  alt={session?.user?.image || "avatar-default"}
                  src={session?.user?.image || "/avatar-default.svg"}
                />
              }
            >
              <Meta title={`Xin chào, ${session?.user?.name}`} description={session?.user?.email} />
            </Card>
            <Button
              type="primary"
              className="mt-3 mx-auto"
              onClick={() => {
                signOut({
                  redirect: true,
                  callbackUrl: "/auth/login",
                });
              }}
            >
              Thoát
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
