package com.boot.jobboard.rest.DTO;

import com.boot.jobboard.rest.dvo.Job;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ApplicationDTO {

    @NotNull(message = "Job ID is required.")
//    private Job jobId;
    private Long jobId;

    @NotBlank(message = "Full name is required.")
    @Size(max = 100, message = "Full name must be less than 100 characters.")
    private String fullName;

    @Email(message = "Invalid email format.")
    @NotBlank(message = "Email is required.")
    private String email;

//    public Job getJobId() {
//        return jobId;
//    }
//
//    public void setJobId(@NotNull(message = "Job ID is required.") Job jobId) {
//        this.jobId = jobId;
//    }
    public Long getJobId() {
    	return jobId;
    }
    
    public void setJobId(@NotNull(message = "Job ID is required.") Long jobId) {
    	this.jobId=jobId;
    }

    public String getFullName() {
        return fullName.trim();
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email.trim().toLowerCase();
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
