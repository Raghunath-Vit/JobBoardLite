package com.boot.jobboard.rest.controller;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.jobboard.rest.dvo.Application;
import com.boot.jobboard.rest.service.ApplicationService;
import com.boot.jobboard.rest.DTO.ApplicationDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<String> applyForJob(@Valid @RequestBody ApplicationDTO applicationDTO) {
        applicationService.applyForJob(applicationDTO);
        return ResponseEntity.ok("Application submitted successfully.");
    }
    
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }
}

