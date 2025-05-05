package com.boot.jobboard.rest.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter implements Filter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket newBucket() {
        // Create a refill with 10 tokens every minute
        Refill refill = Refill.intervally(10, Duration.ofMinutes(1)); 
        // Create a Bandwidth limit using the refill
        Bandwidth limit = Bandwidth.classic(10, refill); 
        // Return a new Bucket with the limit
        return Bucket4j.builder().addLimit(limit).build();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Get the IP address of the request
        String ip = request.getRemoteAddr();
        
        // Compute and store a Bucket for each IP address
        Bucket bucket = buckets.computeIfAbsent(ip, k -> newBucket());

        // Check if a token is available to consume
        if (!bucket.tryConsume(1)) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(429); // Too Many Requests
            httpResponse.getWriter().write("Too many requests - try again later.");
            return;
        }

        // Proceed with the request if the limit is not exceeded
        chain.doFilter(request, response);
    }
}
