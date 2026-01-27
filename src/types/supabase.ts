export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      candidate_competency_ratings: {
        Row: {
          communication_skills: number | null
          culture_fit: number | null
          cv_skill_match: boolean | null
          employer_candidate_rating_id: string | null
          id: string
          problem_solving: number | null
          technical_skills: number | null
        }
        Insert: {
          communication_skills?: number | null
          culture_fit?: number | null
          cv_skill_match?: boolean | null
          employer_candidate_rating_id?: string | null
          id?: string
          problem_solving?: number | null
          technical_skills?: number | null
        }
        Update: {
          communication_skills?: number | null
          culture_fit?: number | null
          cv_skill_match?: boolean | null
          employer_candidate_rating_id?: string | null
          id?: string
          problem_solving?: number | null
          technical_skills?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_competency_ratings_employer_candidate_rating_id_fkey"
            columns: ["employer_candidate_rating_id"]
            isOneToOne: false
            referencedRelation: "employer_candidate_ratings"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_skills: {
        Row: {
          candidate_id: string | null
          experience_years: number | null
          id: string
          skill_id: string | null
        }
        Insert: {
          candidate_id?: string | null
          experience_years?: number | null
          id?: string
          skill_id?: string | null
        }
        Update: {
          candidate_id?: string | null
          experience_years?: number | null
          id?: string
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          address: Json | null
          created_at: string | null
          current_role: string | null
          date_of_birth: string | null
          education: Json | null
          email: string
          experience: Json | null
          full_name: string
          headline: string | null
          id: string
          phone: string | null
          skills: Json | null
          summary: string | null
          user_id: string
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          current_role?: string | null
          date_of_birth?: string | null
          education?: Json | null
          email: string
          experience?: Json | null
          full_name: string
          headline?: string | null
          id?: string
          phone?: string | null
          skills?: Json | null
          summary?: string | null
          user_id: string
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          current_role?: string | null
          date_of_birth?: string | null
          education?: Json | null
          email?: string
          experience?: Json | null
          full_name?: string
          headline?: string | null
          id?: string
          phone?: string | null
          skills?: Json | null
          summary?: string | null
          user_id?: string
        }
        Relationships: []
      }
      employer_candidate_ratings: {
        Row: {
          candidate_id: string | null
          comments: string | null
          created_at: string | null
          employer_id: string | null
          id: string
          job_id: string | null
          overall_rating: number | null
          rating_stage: string
        }
        Insert: {
          candidate_id?: string | null
          comments?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          overall_rating?: number | null
          rating_stage: string
        }
        Update: {
          candidate_id?: string | null
          comments?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          job_id?: string | null
          overall_rating?: number | null
          rating_stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_candidate_ratings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_candidate_ratings_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employer_candidate_ratings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      employers: {
        Row: {
          company_name: string
          company_size: string | null
          created_at: string | null
          description: string | null
          id: string
          industry: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      interview_slots: {
        Row: {
          end_time: string
          id: string
          interview_id: string | null
          is_selected: boolean | null
          start_time: string
        }
        Insert: {
          end_time: string
          id?: string
          interview_id?: string | null
          is_selected?: boolean | null
          start_time: string
        }
        Update: {
          end_time?: string
          id?: string
          interview_id?: string | null
          is_selected?: boolean | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_slots_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          candidate_id: string | null
          created_at: string | null
          employer_id: string | null
          id: string
          interview_round: number | null
          job_id: string | null
          meeting_link: string | null
          scheduled_at: string | null
          status: string | null
        }
        Insert: {
          candidate_id?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          interview_round?: number | null
          job_id?: string | null
          meeting_link?: string | null
          scheduled_at?: string | null
          status?: string | null
        }
        Update: {
          candidate_id?: string | null
          created_at?: string | null
          employer_id?: string | null
          id?: string
          interview_round?: number | null
          job_id?: string | null
          meeting_link?: string | null
          scheduled_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_shortlist_candidates: {
        Row: {
          candidate_id: string | null
          experience_match_status: string | null
          id: string
          job_shortlist_id: string | null
          match_score: number | null
        }
        Insert: {
          candidate_id?: string | null
          experience_match_status?: string | null
          id?: string
          job_shortlist_id?: string | null
          match_score?: number | null
        }
        Update: {
          candidate_id?: string | null
          experience_match_status?: string | null
          id?: string
          job_shortlist_id?: string | null
          match_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_shortlist_candidates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_shortlist_candidates_job_shortlist_id_fkey"
            columns: ["job_shortlist_id"]
            isOneToOne: false
            referencedRelation: "job_shortlists"
            referencedColumns: ["id"]
          },
        ]
      }
      job_shortlists: {
        Row: {
          created_at: string | null
          created_by_admin: string | null
          id: string
          job_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by_admin?: string | null
          id?: string
          job_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by_admin?: string | null
          id?: string
          job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_shortlists_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_skills: {
        Row: {
          id: string
          job_id: string | null
          required_level: string | null
          skill_id: string | null
        }
        Insert: {
          id?: string
          job_id?: string | null
          required_level?: string | null
          skill_id?: string | null
        }
        Update: {
          id?: string
          job_id?: string | null
          required_level?: string | null
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_name: string | null
          created_at: string | null
          employer_id: string | null
          employment_type: string | null
          id: string
          job_description: string | null
          job_title: string
          location: string | null
          salary_max: number | null
          salary_min: number | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          employer_id?: string | null
          employment_type?: string | null
          id?: string
          job_description?: string | null
          job_title: string
          location?: string | null
          salary_max?: number | null
          salary_min?: number | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          employer_id?: string | null
          employment_type?: string | null
          id?: string
          job_description?: string | null
          job_title?: string
          location?: string | null
          salary_max?: number | null
          salary_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
