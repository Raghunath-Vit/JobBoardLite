package com.boot.jobboard.rest.dvo;

import java.util.Objects;

import com.boot.jobboard.rest.util.EmailEncryptor;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "applications", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"email", "job_id"})
	})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
//    @Column(name = "job_id")
//    private Long jobId;
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;
    private String fullName;
    
    @Convert(converter = EmailEncryptor.class)
    private String email;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
//	public Long getJobId() {
//		return jobId;
//	}
//	public void setJobId(Long jobId) {
//		this.jobId = jobId;
//	}
	public Job getJob() {
	    return job;
	}

	public void setJob(Job job) {
	    this.job = job;
	}

	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Application() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public int hashCode() {
		return Objects.hash(email, fullName, id, job);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Application other = (Application) obj;
		return Objects.equals(email, other.email) && Objects.equals(fullName, other.fullName)
				&& Objects.equals(id, other.id) && Objects.equals(job, other.job);
	}
	@Override
	public String toString() {
		return "Application [id=" + id + ", job=" + job + ", fullName=" + fullName + ", email=" + email + "]";
	}
	public Application(Long id, Job job, String fullName, String email) {
		super();
		this.id = id;
		this.job = job;
		this.fullName = fullName;
		this.email = email;
	}
	
    
}

