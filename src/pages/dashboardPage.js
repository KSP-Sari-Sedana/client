import { Fragment } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Panel } from "../components/interface/Panel";
import { DashboardMenu } from "../components/interface/DashboardMenu";

function DashboardLayout({ children }) {
  return (
    <Fragment>
      <Navbar />
      <div className="mt-28 w-11/12 mx-auto">
        <p className="ml-3 font-darkergrotesque font-extrabold text-3xl mb-4">Dashboard</p>
        <div className="flex gap-x-5">
          <DashboardMenu />
          <div className="grow">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}

function UserSummary() {
  return (
    <DashboardLayout>
      <Panel.UserSummary />
    </DashboardLayout>
  );
}

function UserSubmission() {
  return (
    <DashboardLayout>
      <Panel.UserSubmission />
    </DashboardLayout>
  );
}

function UserSaving() {
  return (
    <DashboardLayout>
      <Panel.UserSaving />
    </DashboardLayout>
  );
}

function UserLoan() {
  return (
    <DashboardLayout>
      <Panel.UserLoan />
    </DashboardLayout>
  );
}

function AdminSummary() {
  return (
    <DashboardLayout>
      <Panel.AdminSummary />
    </DashboardLayout>
  );
}

function AdminSubmission() {
  return (
    <DashboardLayout>
      <Panel.AdminSubmission />
    </DashboardLayout>
  );
}

function AdminTransaction() {
  return (
    <DashboardLayout>
      <Panel.AdminTransaction />
    </DashboardLayout>
  );
}

function AdminProduct() {
  return (
    <DashboardLayout>
      <Panel.AdminProduct />
    </DashboardLayout>
  );
}

function AdminUser() {
  return (
    <DashboardLayout>
      <Panel.AdminUser />
    </DashboardLayout>
  );
}

function TellerTransaction() {
  return (
    <DashboardLayout>
      <Panel.TellerTransaction />
    </DashboardLayout>
  );
}

const DashboardPage = {
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

export { DashboardPage };
