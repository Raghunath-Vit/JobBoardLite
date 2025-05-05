package com.boot.jobboard.rest.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class JobDTO {

    @NotBlank(message = "Title is required.")
    @Size(max = 100)
    private String title;

    @NotBlank(message = "Company is required.")
    private String company;

    @NotBlank(message = "Location is required.")
    private String location;

    @NotBlank(message = "Description is required.")
    private String description;

    private String salaryRange;

    private List<@NotBlank(message = "Skill cannot be blank.") String> requiredSkills;

    // Getters and setters with basic sanitization
    public String getTitle() {
        return title.trim();
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company.trim();
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location.trim();
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description.trim();
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalaryRange() {
        return salaryRange == null ? null : salaryRange.trim();
    }

    public void setSalaryRange(String salaryRange) {
        this.salaryRange = salaryRange;
    }

    public List<String> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }
}
