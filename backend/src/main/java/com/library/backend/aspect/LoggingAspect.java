package com.library.backend.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Before("execution(* com.library.backend.controller..*(..)) || execution(* com.library.backend.services..*(..))")
    public void beforeMethod(JoinPoint joinPoint) {
        log.info("Starting Method: {}", joinPoint.getSignature());
        log.info("Arguments: {}", joinPoint.getArgs());
    }

    @AfterReturning(pointcut = "execution(* com.library.backend.controller..*(..)) || execution(* com.library.backend.services..*(..))", returning = "result")
    public void afterReturning(JoinPoint joinPoint, Object result) {
        log.info(" Finished Method: {}", joinPoint.getSignature());
        log.info("Returned: {}", result);
    }

    @AfterThrowing(pointcut = "execution(* com.library.backend.controller..*(..)) || execution(* com.library.backend.services..*(..))", throwing = "ex")
    public void afterThrowing(JoinPoint joinPoint, Exception ex) {
        log.error(" Error in Method: {}", joinPoint.getSignature());
        log.error("Exception: {}", ex.getMessage());
    }
}
