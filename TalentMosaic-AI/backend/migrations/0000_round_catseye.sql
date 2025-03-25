CREATE TYPE "public"."role" AS ENUM('admin', 'recruiter', 'manager');--> statement-breakpoint
CREATE TYPE "public"."source" AS ENUM('linkedin', 'cv_upload');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'interview', 'hired', 'rejected');--> statement-breakpoint
CREATE TABLE "ai_training_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid,
	"job_id" uuid,
	"features" jsonb,
	"score" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid,
	"job_id" uuid,
	"status" "status",
	"score" integer,
	"compatibility" double precision,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "candidates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"source" "source",
	"linkedin_profile" varchar(255),
	"resume" jsonb,
	"skills" text,
	"experience" integer,
	"education" text,
	"location" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "candidate_feedbacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid,
	"feedback" varchar(255),
	"rating" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "candidate_rankings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid,
	"score" integer,
	"ranking" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"industry" varchar(255),
	"size" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "feedback_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"candidate_id" uuid,
	"user_id" uuid,
	"features" jsonb,
	"score_change" double precision,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"job_title" varchar(255),
	"description" text,
	"location" varchar(255),
	"experience_required" integer,
	"skills_required" text,
	"education_required" text,
	"salary_range" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"password" varchar(255),
	"role" "role",
	"linkedin_token" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp (3),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "ai_training_data" ADD CONSTRAINT "ai_training_data_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_training_data" ADD CONSTRAINT "ai_training_data_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_feedbacks" ADD CONSTRAINT "candidate_feedbacks_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "candidate_rankings" ADD CONSTRAINT "candidate_rankings_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback_log" ADD CONSTRAINT "feedback_log_candidate_id_candidates_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."candidates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback_log" ADD CONSTRAINT "feedback_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;