import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import { AppShell } from "@/components/layout/app-shell"
import { CompanyHearingConfirmPage } from "@/pages/companies/company-hearing-confirm-page"
import { CompanyDetailPage } from "@/pages/companies/company-detail-page"
import { CompanyCreatePage, CompanyEditPage } from "@/pages/companies/company-form-page"
import { CompanyHearingFormPage } from "@/pages/companies/company-hearing-form-page"
import { CompanyJobDetailPage } from "@/pages/companies/company-job-detail-page"
import { CompanyJobEditPage } from "@/pages/companies/company-job-form-page"
import { CompanyManagementPage } from "@/pages/companies/company-management-page"
import { DashboardPage } from "@/pages/dashboard/dashboard-page"
import { JobSeekerDetailPage } from "@/pages/job-seekers/job-seeker-detail-page"
import { JobSeekerCreatePage, JobSeekerEditPage } from "@/pages/job-seekers/job-seeker-form-page"
import { JobSeekerManagementPage } from "@/pages/job-seekers/job-seeker-management-page"
import { TaskManagementPage } from "@/pages/tasks/task-management-page"
import { UserCreatePage, UserEditPage } from "@/pages/users/user-form-page"
import { UserDetailPage } from "@/pages/users/user-detail-page"
import { UserManagementPage } from "@/pages/users/user-management-page"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/companies/:id/hearing-form" element={<CompanyHearingFormPage />} />
        <Route path="/companies/:id/hearing-form/confirm" element={<CompanyHearingConfirmPage />} />
        <Route
          path="*"
          element={
            <AppShell>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/" element={<Navigate to="/job-seekers" replace />} />
                <Route path="/job-seekers" element={<JobSeekerManagementPage />} />
                <Route path="/job-seekers/new" element={<JobSeekerCreatePage />} />
                <Route path="/job-seekers/:id" element={<JobSeekerDetailPage />} />
                <Route path="/job-seekers/:id/edit" element={<JobSeekerEditPage />} />
                <Route path="/companies" element={<CompanyManagementPage />} />
                <Route path="/companies/new" element={<CompanyCreatePage />} />
                <Route path="/companies/:id" element={<CompanyDetailPage />} />
                <Route path="/companies/:id/edit" element={<CompanyEditPage />} />
                <Route path="/companies/:id/jobs/:jobId/edit" element={<CompanyJobEditPage />} />
                <Route path="/companies/:id/jobs/:jobId" element={<CompanyJobDetailPage />} />
                <Route path="/tasks" element={<TaskManagementPage />} />
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/users/new" element={<UserCreatePage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
                <Route path="/users/:id/edit" element={<UserEditPage />} />
                <Route path="*" element={<Navigate to="/job-seekers" replace />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
