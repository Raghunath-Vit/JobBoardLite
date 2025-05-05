package com.boot.jobboard.rest.config;


import com.boot.jobboard.rest.dvo.Job;
import com.boot.jobboard.rest.repo.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class JobDataSeeder implements CommandLineRunner {

    private final JobRepository jobRepository;

    public JobDataSeeder(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public void run(String... args) {
        if (jobRepository.count() == 0) {
            Job job1 = new Job(null, "Backend Developer", "TechNova", "New York",
                    "Develop RESTful APIs and microservices using Spring Boot.",
                    "80,000 - 100,000",
                    Arrays.asList("Java", "Spring Boot", "PostgreSQL"));

            Job job2 = new Job(null, "Frontend Developer", "Designify", "San Francisco",
                    "Build engaging UIs using React.js and Material-UI.",
                    "85,000 - 105,000",
                    Arrays.asList("React", "JavaScript", "CSS"));

            Job job3 = new Job(null, "Full Stack Engineer", "Innovatex", "Remote",
                    "Work across frontend and backend on a SaaS platform.",
                    "95,000 - 120,000",
                    Arrays.asList("Java", "React", "MySQL", "Spring Boot"));

            jobRepository.saveAll(Arrays.asList(job1, job2, job3));

            System.out.println("✅ Sample jobs added to database.");
        }
    }
}
