import { Fragment } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Admin } from "../components/interface/AdminPanel";
import { Teller } from "../components/interface/TellerPanel";
import { Warga } from "../components/interface/WargaPanel";
import { DashboardMenu } from "../components/interface/DashboardMenu";

function DashboardLayout({ children }) {
  return (
    <Fragment>
      <div className="pb-36">
        <Navbar />
        <div className="mt-28 w-11/12 mx-auto">
          <p className="ml-3 font-darkergrotesque font-extrabold text-3xl mb-4">Dashboard</p>
          <div className="flex gap-x-5">
            <div>
              <DashboardMenu />
            </div>
            <div className="grow">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function WargaSummary() {
  return (
    <DashboardLayout>
      <Warga.Summary />
    </DashboardLayout>
  );
}

function WargaSubmission() {
  return (
    <DashboardLayout>
      <Warga.Submission />
    </DashboardLayout>
  );
}

function WargaSubmissionDetail() {
  return (
    <DashboardLayout>
      <Warga.SubmissionDetail />
    </DashboardLayout>
  );
}

function WargaSaving() {
  return (
    <DashboardLayout>
      <Warga.Saving />
    </DashboardLayout>
  );
}

function WargaSavingDetail() {
  return (
    <DashboardLayout>
      <Warga.SavingDetail />
    </DashboardLayout>
  );
}

function WargaLoan() {
  return (
    <DashboardLayout>
      <Warga.Loan />
    </DashboardLayout>
  );
}

function WargaLoanDetail() {
  return (
    <DashboardLayout>
      <Warga.LoanDetail />
    </DashboardLayout>
  );
}

function AdminSummary() {
  return (
    <DashboardLayout>
      <Admin.Summary />
    </DashboardLayout>
  );
}

function AdminSubmission() {
  return (
    <DashboardLayout>
      <Admin.Submission />
    </DashboardLayout>
  );
}

function AdminSubmissionDetail() {
  return (
    <DashboardLayout>
      <Admin.SubmissionDetail />
    </DashboardLayout>
  );
}

function AdminTransaction() {
  return (
    <DashboardLayout>
      <Admin.Transaction />
    </DashboardLayout>
  );
}

function AdminProduct() {
  return (
    <DashboardLayout>
      <Admin.Product />
    </DashboardLayout>
  );
}

function AdminProductDetail() {
  return (
    <DashboardLayout>
      <Admin.ProductDetail />
    </DashboardLayout>
  );
}

function AdminUser() {
  return (
    <DashboardLayout>
      <Admin.User />
    </DashboardLayout>
  );
}

function AdminUserDetail() {
  return (
    <DashboardLayout>
      <Admin.UserDetail />
    </DashboardLayout>
  );
}

function TellerTransaction() {
  return (
    <DashboardLayout>
      <Teller.Transaction />
    </DashboardLayout>
  );
}

const DashboardPage = {
  WargaSummary,
  WargaSubmission,
  WargaSubmissionDetail,
  WargaSaving,
  WargaSavingDetail,
  WargaLoan,
  WargaLoanDetail,
  AdminSummary,
  AdminSubmission,
  AdminSubmissionDetail,
  AdminTransaction,
  AdminProduct,
  AdminProductDetail,
  AdminUser,
  AdminUserDetail,
  TellerTransaction,
};

export { DashboardPage };
