import { Fragment } from "react";

import { Navbar } from "../components/interface/Navbar";
import { Admin } from "../components/interface/AdminPanel";
import { Teller } from "../components/interface/TellerPanel";
import { Member } from "../components/interface/MemberPanel";
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

function MemberSummary() {
  return (
    <DashboardLayout>
      <Member.Summary />
    </DashboardLayout>
  );
}

function MemberSubmission() {
  return (
    <DashboardLayout>
      <Member.Submission />
    </DashboardLayout>
  );
}

function MemberSubmissionDetail() {
  return (
    <DashboardLayout>
      <Member.SubmissionDetail />
    </DashboardLayout>
  );
}

function MemberSaving() {
  return (
    <DashboardLayout>
      <Member.Saving />
    </DashboardLayout>
  );
}

function MemberSavingDetail() {
  return (
    <DashboardLayout>
      <Member.SavingDetail />
    </DashboardLayout>
  );
}

function MemberLoan() {
  return (
    <DashboardLayout>
      <Member.Loan />
    </DashboardLayout>
  );
}

function MemberLoanDetail() {
  return (
    <DashboardLayout>
      <Member.LoanDetail />
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

function AdminUser() {
  return (
    <DashboardLayout>
      <Admin.User />
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
  MemberSummary,
  MemberSubmission,
  MemberSubmissionDetail,
  MemberSaving,
  MemberSavingDetail,
  MemberLoan,
  MemberLoanDetail,
  AdminSummary,
  AdminSubmission,
  AdminSubmissionDetail,
  AdminTransaction,
  AdminProduct,
  AdminUser,
  TellerTransaction,
};

export { DashboardPage };
