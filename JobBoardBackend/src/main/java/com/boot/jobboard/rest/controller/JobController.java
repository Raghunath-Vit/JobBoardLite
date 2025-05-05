

package com.boot.jobboard.rest.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.jobboard.rest.DTO.JobDTO;
import com.boot.jobboard.rest.dvo.Job;
import com.boot.jobboard.rest.service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(@RequestParam("role") String role) {
        if (role == null || role.trim().isEmpty()) {
             return ResponseEntity.badRequest().body(Collections.emptyList());
        }
        List<Job> jobs = jobService.searchJobs(role);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobDetails(@PathVariable Long id) {
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody JobDTO jobDTO) {
        Job createdJob = jobService.createJob(jobDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);
    }
}
