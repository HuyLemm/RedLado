plugins {
	java
	id("org.springframework.boot") version "3.3.2"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "Fanta2"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("com.google.firebase:firebase-admin:9.0.0")
	implementation("org.springframework.boot:spring-boot-starter-data-rest")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.okta.spring:okta-spring-boot-starter:3.0.7")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
    implementation("org.springframework.boot:spring-boot-starter-security")

	implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.springframework.security:spring-security-config")
    implementation("org.springframework.security:spring-security-core")
	implementation("org.web3j:core:5.0.0") // Core module
    implementation("org.web3j:contracts:5.0.0") // Contracts module, if needed
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("javax.persistence:javax.persistence-api:2.2") // Thêm dòng này	

	
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
	ignoreFailures = true

}


