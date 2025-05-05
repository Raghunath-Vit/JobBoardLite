package com.boot.jobboard.rest.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.boot.jobboard.rest.dvo.Application;
import com.boot.jobboard.rest.dvo.Job;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
	 Optional<Application> findByEmailAndJob(String email, Job job);
}

