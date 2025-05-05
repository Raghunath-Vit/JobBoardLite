package com.boot.jobboard.rest.service;

import java.util.List;
import java.util.Optional;
import org.springframework.web.util.HtmlUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.jobboard.rest.dvo.Job;
import com.boot.jobboard.rest.exception.JobNotFoundException;
import com.boot.jobboard.rest.repo.JobRepository;
import com.boot.jobboard.rest.DTO.JobDTO;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

//    public List<Job> searchJobs(String role) {
//        return jobRepository.findByTitleContainingIgnoreCase(role);
//    }
    
    public List<Job> searchJobs(String roleKeyword) {
        List<Job> jobs = jobRepository.findByTitleContainingIgnoreCase(roleKeyword);

        if (jobs.isEmpty()) {
            throw new JobNotFoundException("No jobs found for role: " + roleKeyword);
        }

        return jobs;
    }


    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }
    
    public Job createJob(JobDTO dto) {
    	  
    	  String safeTitle = HtmlUtils.htmlEscape(dto.getTitle());
          String safeCompany = HtmlUtils.htmlEscape(dto.getCompany());
          String safeLocation = HtmlUtils.htmlEscape(dto.getLocation());
          String safeDescription = HtmlUtils.htmlEscape(dto.getDescription());
          String safeSalaryRange = dto.getSalaryRange() != null ? HtmlUtils.htmlEscape(dto.getSalaryRange()) : null;

          List<String> safeSkills = dto.getRequiredSkills();

          Job job = new Job();
          job.setTitle(safeTitle);
          job.setCompany(safeCompany);
          job.setLocation(safeLocation);
          job.setDescription(safeDescription);
          job.setSalaryRange(safeSalaryRange);
          job.setRequiredSkills(safeSkills);
        return jobRepository.save(job);
    }
}

