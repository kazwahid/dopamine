/**
 * Core Type Definitions
 * Shared types for Dopamine Cinema Studio architecture and media systems.
 */

export interface WorkProject {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  mediaSrc: string;
  description: string;
}

export interface InquiryFormData {
  email: string;
  scope: string;
}
