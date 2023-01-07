import { useState, useEffect } from "react";

import { Card } from "./Card";
import { useSubmContext } from "../../context/submContext";

function UserSummary() {
  return <div></div>;
}

function UserSubmission() {
  const [subms, setSubms] = useState([]);
  const { submCtx } = useSubmContext();

  useEffect(() => {
    getSubms();
  }, []);

  async function getSubms() {
    setSubms(await submCtx.getByUser());
  }

  return (
    <div>
      <p className="font-darkergrotesque text-2xl font-extrabold mb-3">Daftar pengajuan</p>
      <div className="grid grid-cols-3 place-items-center gap-y-4">
        {subms.map((subm, index) => {
          return <Card.Submission key={index} id={subm.submId} status={subm.status} date={subm.submDate} productName={subm.productName} productType={subm.productType} />;
        })}
      </div>
    </div>
  );
}

function UserSaving() {
  return <div></div>;
}

function UserLoan() {
  return <div></div>;
}

function AdminSummary() {
  return <div></div>;
}

function AdminSubmission() {
  return <div></div>;
}

function AdminTransaction() {
  return <div></div>;
}

function AdminProduct() {
  return <div></div>;
}

function AdminUser() {
  return <div></div>;
}

function TellerTransaction() {
  return <div></div>;
}

const Panel = {
  UserSummary,
  UserSubmission,
  UserSaving,
  UserLoan,
  AdminSummary,
  AdminSubmission,
  AdminTransaction,
  AdminProduct,
  AdminUser,
  TellerTransaction,
};

export { Panel };
