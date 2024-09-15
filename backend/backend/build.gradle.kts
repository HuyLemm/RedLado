plugins {
	java
	id("org.springframework.boot") version "3.3.2"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "Fanta2"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)	
	}
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
	//firebase
	implementation("com.google.firebase:firebase-admin:9.0.0") //firebase

	// JAXB API và runtime để hỗ trợ DatatypeConverter
    implementation("javax.xml.bind:jaxb-api:2.3.1") 
    implementation("org.glassfish.jaxb:jaxb-runtime:2.3.1")

	// JWT
	implementation("io.jsonwebtoken:jjwt:0.9.1")

	//Springboot
	implementation("org.springframework.boot:spring-boot-starter-data-rest")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("com.okta.spring:okta-spring-boot-starter:3.0.7")
    implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.security:spring-security-config")
    implementation("org.springframework.security:spring-security-core")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	//kotlin
	implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	//javax
	implementation("javax.persistence:javax.persistence-api:2.2") // Thêm dòng này		
	implementation("javax.servlet:javax.servlet-api:4.0.1")

	//lombok, test implement và devtool của springboot
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

     /* Tất cả đều sử dụng đừng xoá gì hết nhé, có thêm vào thì note riêng thêm công năng đặc dị. */

tasks.withType<Test> {
	useJUnitPlatform()
	ignoreFailures = true

}