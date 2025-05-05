package com.boot.jobboard.rest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import com.boot.jobboard.rest.DTO.ApplicationDTO;
import com.boot.jobboard.rest.dvo.Application;
import com.boot.jobboard.rest.dvo.Job;
import com.boot.jobboard.rest.exception.JobNotFoundException;
import com.boot.jobboard.rest.repo.ApplicationRepository;
import com.boot.jobboard.rest.repo.JobRepository;
import com.boot.jobboard.rest.util.EncryptionUtil;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    
    @Autowired
    private JobRepository jobRepository;
    
    
    public Application applyForJob(ApplicationDTO dto) {
//        if (!jobRepository.existsById(dto.getJobId().getId())) {
//            throw new JobNotFoundException("Job with ID " + dto.getJobId().getId() + " does not exist.");
//        }
//
//        boolean alreadyApplied = applicationRepository
//            .findByEmailAndJobId(dto.getEmail(), dto.getJobId())
//            .isPresent();
    	Job job = jobRepository.findById(dto.getJobId())
    		    .orElseThrow(() -> new JobNotFoundException("Job with ID " + dto.getJobId() + " does not exist."));

    		boolean alreadyApplied = applicationRepository
    		    .findByEmailAndJob(dto.getEmail(), job)
    		    .isPresent();

        if (alreadyApplied) {
            throw new IllegalArgumentException("You have already applied for this job.");
        }

        String safeFullName = HtmlUtils.htmlEscape(dto.getFullName());
        String encryptedEmail = EncryptionUtil.encrypt(HtmlUtils.htmlEscape(dto.getEmail()));
//        String safeEmail = HtmlUtils.htmlEscape(dto.getEmail());

        Application application = new Application();
        application.setJob(job);
//        application.setJob(dto.getJobId());
        application.setFullName(safeFullName);
        application.setEmail(encryptedEmail);
        
        return applicationRepository.save(application);
    }
    
    public List<Application> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();
        for (Application app : applications) {
            app.setEmail(EncryptionUtil.decrypt(app.getEmail()));
        }
        return applications;
    }

}

