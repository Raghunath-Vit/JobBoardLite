package com.boot.jobboard.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.boot.jobboard.rest.DTO.EmailRequestDTO;

import jakarta.mail.MessagingException;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(EmailRequestDTO emailRequestDTO) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailRequestDTO.getEmail());
        message.setSubject(emailRequestDTO.getSubject());
        message.setText(emailRequestDTO.getMessage());
        mailSender.send(message);
    }
}


