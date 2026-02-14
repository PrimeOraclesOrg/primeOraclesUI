export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  public: {
    Tables: {
      chats: {
        Row: {
          buyer_id: string;
          created_at: string;
          id: string;
          is_closed: boolean;
          purchase_id: string;
          seller_id: string;
        };
        Insert: {
          buyer_id: string;
          created_at?: string;
          id?: string;
          is_closed?: boolean;
          purchase_id: string;
          seller_id: string;
        };
        Update: {
          buyer_id?: string;
          created_at?: string;
          id?: string;
          is_closed?: boolean;
          purchase_id?: string;
          seller_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chats_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "chats_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: true;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["purchase_id"];
          },
          {
            foreignKeyName: "chats_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: true;
            referencedRelation: "purchases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "chats_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      chats_messages: {
        Row: {
          author_id: string;
          chat_id: string;
          created_at: string;
          id: string;
          message_text: string;
        };
        Insert: {
          author_id: string;
          chat_id: string;
          created_at?: string;
          id?: string;
          message_text: string;
        };
        Update: {
          author_id?: string;
          chat_id?: string;
          created_at?: string;
          id?: string;
          message_text?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chats_messages_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "chats_messages_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_messages_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["chat_id"];
          },
          {
            foreignKeyName: "chats_messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chats_messages_chat_id_fkey";
            columns: ["chat_id"];
            isOneToOne: false;
            referencedRelation: "user_chats_view";
            referencedColumns: ["chat_id"];
          },
        ];
      };
      escrows: {
        Row: {
          amount_usd: number;
          buyer_id: string;
          created_at: string;
          id: string;
          purchase_id: string;
          resolved_at: string | null;
          seller_id: string;
          state: Database["public"]["Enums"]["escrow_state"];
        };
        Insert: {
          amount_usd: number;
          buyer_id: string;
          created_at?: string;
          id?: string;
          purchase_id: string;
          resolved_at?: string | null;
          seller_id: string;
          state: Database["public"]["Enums"]["escrow_state"];
        };
        Update: {
          amount_usd?: number;
          buyer_id?: string;
          created_at?: string;
          id?: string;
          purchase_id?: string;
          resolved_at?: string | null;
          seller_id?: string;
          state?: Database["public"]["Enums"]["escrow_state"];
        };
        Relationships: [
          {
            foreignKeyName: "escrows_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "escrows_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "escrows_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "escrows_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: true;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["purchase_id"];
          },
          {
            foreignKeyName: "escrows_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: true;
            referencedRelation: "purchases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "escrows_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "escrows_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "escrows_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      ledger_correction_log: {
        Row: {
          authorized_by: string;
          created_at: string;
          documentation_reference: string | null;
          id: string;
          new_data: Json | null;
          old_data: Json | null;
          operation: string;
          reason: string;
          table_name: string;
        };
        Insert: {
          authorized_by: string;
          created_at?: string;
          documentation_reference?: string | null;
          id?: string;
          new_data?: Json | null;
          old_data?: Json | null;
          operation: string;
          reason: string;
          table_name: string;
        };
        Update: {
          authorized_by?: string;
          created_at?: string;
          documentation_reference?: string | null;
          id?: string;
          new_data?: Json | null;
          old_data?: Json | null;
          operation?: string;
          reason?: string;
          table_name?: string;
        };
        Relationships: [];
      };
      ledger_transactions: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          reference_id: string;
          reference_type: Database["public"]["Enums"]["ledger_reference_type"];
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          reference_id: string;
          reference_type: Database["public"]["Enums"]["ledger_reference_type"];
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          reference_id?: string;
          reference_type?: Database["public"]["Enums"]["ledger_reference_type"];
        };
        Relationships: [];
      };
      payment_intents: {
        Row: {
          billable_id: string;
          billable_type: Database["public"]["Enums"]["billable_type"];
          created_at: string;
          expected_amount_usd: number;
          expires_at: string | null;
          id: string;
          overpaid_amount_usd: number | null;
          paid_amount_usd: number | null;
          payment_state: Database["public"]["Enums"]["payment_state"];
          provider: Database["public"]["Enums"]["payment_provider"];
          provider_payment_id: string | null;
          purchase_id: string | null;
          updated_at: string;
        };
        Insert: {
          billable_id: string;
          billable_type?: Database["public"]["Enums"]["billable_type"];
          created_at?: string;
          expected_amount_usd: number;
          expires_at?: string | null;
          id?: string;
          overpaid_amount_usd?: number | null;
          paid_amount_usd?: number | null;
          payment_state: Database["public"]["Enums"]["payment_state"];
          provider: Database["public"]["Enums"]["payment_provider"];
          provider_payment_id?: string | null;
          purchase_id?: string | null;
          updated_at?: string;
        };
        Update: {
          billable_id?: string;
          billable_type?: Database["public"]["Enums"]["billable_type"];
          created_at?: string;
          expected_amount_usd?: number;
          expires_at?: string | null;
          id?: string;
          overpaid_amount_usd?: number | null;
          paid_amount_usd?: number | null;
          payment_state?: Database["public"]["Enums"]["payment_state"];
          provider?: Database["public"]["Enums"]["payment_provider"];
          provider_payment_id?: string | null;
          purchase_id?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      payment_provider_events: {
        Row: {
          id: string;
          payment_intent_id: string | null;
          processed_at: string | null;
          processing_error: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          provider_event_id: string;
          raw_payload: Json;
          received_at: string;
        };
        Insert: {
          id?: string;
          payment_intent_id?: string | null;
          processed_at?: string | null;
          processing_error?: string | null;
          provider: Database["public"]["Enums"]["payment_provider"];
          provider_event_id: string;
          raw_payload: Json;
          received_at?: string;
        };
        Update: {
          id?: string;
          payment_intent_id?: string | null;
          processed_at?: string | null;
          processing_error?: string | null;
          provider?: Database["public"]["Enums"]["payment_provider"];
          provider_event_id?: string;
          raw_payload?: Json;
          received_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_provider_events_payment_intent_id_fkey";
            columns: ["payment_intent_id"];
            isOneToOne: false;
            referencedRelation: "payment_intents";
            referencedColumns: ["id"];
          },
        ];
      };
      platform_accounting_entries: {
        Row: {
          account_code: Database["public"]["Enums"]["system_account_code"];
          accounting_action: Database["public"]["Enums"]["accounting_action"];
          amount_usd: number;
          created_at: string;
          description: string | null;
          direction: Database["public"]["Enums"]["ledger_direction"];
          event_type: Database["public"]["Enums"]["ledger_event_type"];
          id: string;
          reference_id: string;
          transaction_id: string;
        };
        Insert: {
          account_code: Database["public"]["Enums"]["system_account_code"];
          accounting_action: Database["public"]["Enums"]["accounting_action"];
          amount_usd: number;
          created_at?: string;
          description?: string | null;
          direction: Database["public"]["Enums"]["ledger_direction"];
          event_type: Database["public"]["Enums"]["ledger_event_type"];
          id?: string;
          reference_id: string;
          transaction_id: string;
        };
        Update: {
          account_code?: Database["public"]["Enums"]["system_account_code"];
          accounting_action?: Database["public"]["Enums"]["accounting_action"];
          amount_usd?: number;
          created_at?: string;
          description?: string | null;
          direction?: Database["public"]["Enums"]["ledger_direction"];
          event_type?: Database["public"]["Enums"]["ledger_event_type"];
          id?: string;
          reference_id?: string;
          transaction_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "platform_accounting_entries_account_code_fkey";
            columns: ["account_code"];
            isOneToOne: false;
            referencedRelation: "system_accounts";
            referencedColumns: ["account_code"];
          },
          {
            foreignKeyName: "platform_accounting_entries_transaction_id_fkey";
            columns: ["transaction_id"];
            isOneToOne: false;
            referencedRelation: "ledger_transactions";
            referencedColumns: ["id"];
          },
        ];
      };
      product_category_l1: {
        Row: {
          code: string;
          created_at: string;
          id: string;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          sort_order?: number;
        };
        Relationships: [];
      };
      product_category_l2: {
        Row: {
          code: string;
          id: string;
          is_active: boolean;
          l1_id: string;
          sort_order: number;
        };
        Insert: {
          code: string;
          id?: string;
          is_active?: boolean;
          l1_id: string;
          sort_order?: number;
        };
        Update: {
          code?: string;
          id?: string;
          is_active?: boolean;
          l1_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_category_l2_l1_id_fkey";
            columns: ["l1_id"];
            isOneToOne: false;
            referencedRelation: "product_categories_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_category_l2_l1_id_fkey";
            columns: ["l1_id"];
            isOneToOne: false;
            referencedRelation: "product_category_l1";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          category_l1_id: string;
          category_l2_id: string;
          comments_count: number;
          cover_url: string | null;
          created_at: string;
          created_by: string;
          description: string;
          id: string;
          is_active: boolean;
          price: number;
          rating: number;
          rating_1_count: number;
          rating_2_count: number;
          rating_3_count: number;
          rating_4_count: number;
          rating_5_count: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          category_l1_id: string;
          category_l2_id: string;
          comments_count?: number;
          cover_url?: string | null;
          created_at?: string;
          created_by: string;
          description: string;
          id?: string;
          is_active?: boolean;
          price: number;
          rating?: number;
          rating_1_count?: number;
          rating_2_count?: number;
          rating_3_count?: number;
          rating_4_count?: number;
          rating_5_count?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          category_l1_id?: string;
          category_l2_id?: string;
          comments_count?: number;
          cover_url?: string | null;
          created_at?: string;
          created_by?: string;
          description?: string;
          id?: string;
          is_active?: boolean;
          price?: number;
          rating?: number;
          rating_1_count?: number;
          rating_2_count?: number;
          rating_3_count?: number;
          rating_4_count?: number;
          rating_5_count?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_l1_id_fkey";
            columns: ["category_l1_id"];
            isOneToOne: false;
            referencedRelation: "product_categories_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_category_l1_id_fkey";
            columns: ["category_l1_id"];
            isOneToOne: false;
            referencedRelation: "product_category_l1";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_category_l2_id_fkey";
            columns: ["category_l2_id"];
            isOneToOne: false;
            referencedRelation: "product_category_l2";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "products_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      products_advantages: {
        Row: {
          description: string;
          id: string;
          position: number;
          product_id: string;
        };
        Insert: {
          description: string;
          id?: string;
          position: number;
          product_id: string;
        };
        Update: {
          description?: string;
          id?: string;
          position?: number;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_advantages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "products_advantages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_advantages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "user_transactions_view";
            referencedColumns: ["product_id"];
          },
        ];
      };
      products_comments: {
        Row: {
          comment: string;
          created_at: string;
          created_by: string;
          id: string;
          product_id: string;
          rating: number;
        };
        Insert: {
          comment: string;
          created_at?: string;
          created_by: string;
          id?: string;
          product_id: string;
          rating: number;
        };
        Update: {
          comment?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          product_id?: string;
          rating?: number;
        };
        Relationships: [
          {
            foreignKeyName: "products_comments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "products_comments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_comments_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_comments_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "products_comments_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_comments_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "user_transactions_view";
            referencedColumns: ["product_id"];
          },
        ];
      };
      products_faq: {
        Row: {
          answer: string;
          id: string;
          position: number;
          product_id: string;
          question: string;
        };
        Insert: {
          answer: string;
          id?: string;
          position: number;
          product_id: string;
          question: string;
        };
        Update: {
          answer?: string;
          id?: string;
          position?: number;
          product_id?: string;
          question?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_faq_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "products_faq_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_faq_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "user_transactions_view";
            referencedColumns: ["product_id"];
          },
        ];
      };
      products_resources: {
        Row: {
          created_at: string;
          id: string;
          instructions: string;
          product_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          instructions: string;
          product_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          instructions?: string;
          product_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_resources_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "products_resources_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_resources_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "user_transactions_view";
            referencedColumns: ["product_id"];
          },
        ];
      };
      profile_security_events: {
        Row: {
          client_ip_hash: string | null;
          created_at: string;
          event_type: Database["public"]["Enums"]["profile_security_event_type"];
          id: string;
          provider_type: Database["public"]["Enums"]["profile_security_provider_type"];
          user_agent: string | null;
          user_id: string;
          verified_at: string;
        };
        Insert: {
          client_ip_hash?: string | null;
          created_at?: string;
          event_type: Database["public"]["Enums"]["profile_security_event_type"];
          id?: string;
          provider_type: Database["public"]["Enums"]["profile_security_provider_type"];
          user_agent?: string | null;
          user_id: string;
          verified_at?: string;
        };
        Update: {
          client_ip_hash?: string | null;
          created_at?: string;
          event_type?: Database["public"]["Enums"]["profile_security_event_type"];
          id?: string;
          provider_type?: Database["public"]["Enums"]["profile_security_provider_type"];
          user_agent?: string | null;
          user_id?: string;
          verified_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_path: string;
          bio: string | null;
          created_at: string;
          email_hash: string;
          id: string;
          is_profile_completed: boolean;
          is_verified: boolean;
          name: string | null;
          role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          username: string | null;
        };
        Insert: {
          avatar_path: string;
          bio?: string | null;
          created_at?: string;
          email_hash: string;
          id: string;
          is_profile_completed?: boolean;
          is_verified?: boolean;
          name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          avatar_path?: string;
          bio?: string | null;
          created_at?: string;
          email_hash?: string;
          id?: string;
          is_profile_completed?: boolean;
          is_verified?: boolean;
          name?: string | null;
          role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      profiles_social_medias: {
        Row: {
          created_at: string;
          id: string;
          link: string;
          profile_id: string;
          type: Database["public"]["Enums"]["social_media_type"];
        };
        Insert: {
          created_at?: string;
          id?: string;
          link: string;
          profile_id: string;
          type: Database["public"]["Enums"]["social_media_type"];
        };
        Update: {
          created_at?: string;
          id?: string;
          link?: string;
          profile_id?: string;
          type?: Database["public"]["Enums"]["social_media_type"];
        };
        Relationships: [
          {
            foreignKeyName: "profiles_social_medias_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "profiles_social_medias_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_social_medias_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      purchase_status_history: {
        Row: {
          changed_by_system: boolean;
          changed_by_user_id: string | null;
          created_at: string;
          id: string;
          metadata: Json | null;
          new_status: Database["public"]["Enums"]["purchase_status"];
          old_status: Database["public"]["Enums"]["purchase_status"] | null;
          purchase_id: string;
          reason: Database["public"]["Enums"]["status_change_reason"] | null;
        };
        Insert: {
          changed_by_system?: boolean;
          changed_by_user_id?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          new_status: Database["public"]["Enums"]["purchase_status"];
          old_status?: Database["public"]["Enums"]["purchase_status"] | null;
          purchase_id: string;
          reason?: Database["public"]["Enums"]["status_change_reason"] | null;
        };
        Update: {
          changed_by_system?: boolean;
          changed_by_user_id?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          new_status?: Database["public"]["Enums"]["purchase_status"];
          old_status?: Database["public"]["Enums"]["purchase_status"] | null;
          purchase_id?: string;
          reason?: Database["public"]["Enums"]["status_change_reason"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "purchase_status_history_changed_by_user_id_fkey";
            columns: ["changed_by_user_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "purchase_status_history_changed_by_user_id_fkey";
            columns: ["changed_by_user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_status_history_changed_by_user_id_fkey";
            columns: ["changed_by_user_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchase_status_history_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["purchase_id"];
          },
          {
            foreignKeyName: "purchase_status_history_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: false;
            referencedRelation: "purchases";
            referencedColumns: ["id"];
          },
        ];
      };
      purchases: {
        Row: {
          buyer_id: string;
          confirmation_deadline: string | null;
          created_at: string;
          id: string;
          is_confirmed: boolean;
          price_usd: number;
          product_id: string;
          seller_id: string;
          status: Database["public"]["Enums"]["purchase_status"];
          updated_at: string;
        };
        Insert: {
          buyer_id: string;
          confirmation_deadline?: string | null;
          created_at?: string;
          id?: string;
          is_confirmed?: boolean;
          price_usd: number;
          product_id: string;
          seller_id: string;
          status: Database["public"]["Enums"]["purchase_status"];
          updated_at?: string;
        };
        Update: {
          buyer_id?: string;
          confirmation_deadline?: string | null;
          created_at?: string;
          id?: string;
          is_confirmed?: boolean;
          price_usd?: number;
          product_id?: string;
          seller_id?: string;
          status?: Database["public"]["Enums"]["purchase_status"];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "purchases_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "purchases_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_buyer_id_fkey";
            columns: ["buyer_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "user_transactions_view";
            referencedColumns: ["product_id"];
          },
          {
            foreignKeyName: "purchases_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "purchases_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_seller_id_fkey";
            columns: ["seller_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      reconciliation_runs: {
        Row: {
          discrepancy_details: Json | null;
          discrepancy_usd: number | null;
          escrow_accounting_usd: number;
          escrow_operational_usd: number;
          id: string;
          is_balanced: boolean;
          platform_revenue_usd: number;
          run_at: string;
          run_date: string;
          total_user_balances_usd: number;
          total_user_ledger_usd: number;
        };
        Insert: {
          discrepancy_details?: Json | null;
          discrepancy_usd?: number | null;
          escrow_accounting_usd: number;
          escrow_operational_usd: number;
          id?: string;
          is_balanced: boolean;
          platform_revenue_usd: number;
          run_at?: string;
          run_date: string;
          total_user_balances_usd: number;
          total_user_ledger_usd: number;
        };
        Update: {
          discrepancy_details?: Json | null;
          discrepancy_usd?: number | null;
          escrow_accounting_usd?: number;
          escrow_operational_usd?: number;
          id?: string;
          is_balanced?: boolean;
          platform_revenue_usd?: number;
          run_at?: string;
          run_date?: string;
          total_user_balances_usd?: number;
          total_user_ledger_usd?: number;
        };
        Relationships: [];
      };
      system_accounts: {
        Row: {
          account_code: Database["public"]["Enums"]["system_account_code"];
          account_name: string;
          account_type: Database["public"]["Enums"]["accounting_type"];
          created_at: string;
          description: string | null;
          id: string;
          is_active: boolean;
        };
        Insert: {
          account_code: Database["public"]["Enums"]["system_account_code"];
          account_name: string;
          account_type: Database["public"]["Enums"]["accounting_type"];
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
        };
        Update: {
          account_code?: Database["public"]["Enums"]["system_account_code"];
          account_name?: string;
          account_type?: Database["public"]["Enums"]["accounting_type"];
          created_at?: string;
          description?: string | null;
          id?: string;
          is_active?: boolean;
        };
        Relationships: [];
      };
      user_balances: {
        Row: {
          balance_usd: number;
          last_entry_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          balance_usd?: number;
          last_entry_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          balance_usd?: number;
          last_entry_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_balances_last_entry_id_fkey";
            columns: ["last_entry_id"];
            isOneToOne: false;
            referencedRelation: "user_ledger_entries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_balances_last_entry_id_fkey";
            columns: ["last_entry_id"];
            isOneToOne: false;
            referencedRelation: "user_transactions_view";
            referencedColumns: ["transaction_id"];
          },
          {
            foreignKeyName: "user_balances_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "user_balances_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_balances_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      user_ledger_entries: {
        Row: {
          accounting_action: Database["public"]["Enums"]["accounting_action"];
          amount_usd: number;
          created_at: string;
          direction: Database["public"]["Enums"]["ledger_direction"];
          event_type: Database["public"]["Enums"]["ledger_event_type"];
          id: string;
          reference_id: string;
          transaction_id: string;
          user_id: string;
        };
        Insert: {
          accounting_action: Database["public"]["Enums"]["accounting_action"];
          amount_usd: number;
          created_at?: string;
          direction: Database["public"]["Enums"]["ledger_direction"];
          event_type: Database["public"]["Enums"]["ledger_event_type"];
          id?: string;
          reference_id: string;
          transaction_id: string;
          user_id: string;
        };
        Update: {
          accounting_action?: Database["public"]["Enums"]["accounting_action"];
          amount_usd?: number;
          created_at?: string;
          direction?: Database["public"]["Enums"]["ledger_direction"];
          event_type?: Database["public"]["Enums"]["ledger_event_type"];
          id?: string;
          reference_id?: string;
          transaction_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_ledger_entries_transaction_id_fkey";
            columns: ["transaction_id"];
            isOneToOne: false;
            referencedRelation: "ledger_transactions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_ledger_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "buyer_purchases_view";
            referencedColumns: ["seller_id"];
          },
          {
            foreignKeyName: "user_ledger_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_ledger_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      buyer_purchases_view: {
        Row: {
          chat_id: string | null;
          confirmation_deadline: string | null;
          is_confirmed: boolean | null;
          price_usd: number | null;
          product_category: Json | null;
          product_comments_count: number | null;
          product_cover_url: string | null;
          product_description: string | null;
          product_id: string | null;
          product_rating: number | null;
          product_title: string | null;
          purchase_id: string | null;
          purchase_status: Database["public"]["Enums"]["purchase_status"] | null;
          purchased_at: string | null;
          seller_avatar_path: string | null;
          seller_id: string | null;
          seller_is_verified: boolean | null;
          seller_name: string | null;
        };
        Relationships: [];
      };
      product_categories_view: {
        Row: {
          code: string | null;
          id: string | null;
          sort_order: number | null;
          subcategories: Json | null;
        };
        Insert: {
          code?: string | null;
          id?: string | null;
          sort_order?: number | null;
          subcategories?: never;
        };
        Update: {
          code?: string | null;
          id?: string | null;
          sort_order?: number | null;
          subcategories?: never;
        };
        Relationships: [];
      };
      public_profiles_full_view: {
        Row: {
          avatar_path: string | null;
          bio: string | null;
          id: string | null;
          is_profile_completed: boolean | null;
          is_verified: boolean | null;
          name: string | null;
          social_medias: Json | null;
          username: string | null;
        };
        Relationships: [];
      };
      user_chats_view: {
        Row: {
          chat_created_at: string | null;
          chat_id: string | null;
          chat_is_closed: boolean | null;
          product_category: Json | null;
          product_cover_url: string | null;
          product_title: string | null;
          purchase_confirmation_deadline: string | null;
        };
        Relationships: [];
      };
      user_transactions_view: {
        Row: {
          accounting_action: Database["public"]["Enums"]["accounting_action"] | null;
          amount_usd: number | null;
          direction: Database["public"]["Enums"]["ledger_direction"] | null;
          event_type: Database["public"]["Enums"]["ledger_event_type"] | null;
          product_cover_url: string | null;
          product_id: string | null;
          product_title: string | null;
          reference_id: string | null;
          transaction_date: string | null;
          transaction_id: string | null;
        };
        Relationships: [];
      };
      user_wallet_view: {
        Row: {
          available_balance_usd: number | null;
          pending_purchases_usd: number | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      _app_build_avatar_path: {
        Args: { p_default_avatar_name?: string; p_user_id: string };
        Returns: string;
      };
      _app_hash_email: { Args: { p_email: string }; Returns: string };
      _app_hash_ip: { Args: { p_ip: string }; Returns: string };
      _app_owner_products_build_cursor: {
        Args: {
          p_sort: Database["public"]["Enums"]["owner_product_sort_option"];
        };
        Returns: string;
      };
      _app_owner_products_cursor_condition: {
        Args: {
          p_cursor: Json;
          p_sort: Database["public"]["Enums"]["owner_product_sort_option"];
        };
        Returns: string;
      };
      _app_owner_products_sort_clause: {
        Args: {
          p_sort: Database["public"]["Enums"]["owner_product_sort_option"];
        };
        Returns: string;
      };
      _app_product_validation_constants: { Args: never; Returns: Json };
      _app_require_completed_profile: { Args: never; Returns: undefined };
      _app_sanitize_text: {
        Args: { p_allow_newlines?: boolean; p_input: string };
        Returns: string;
      };
      _app_validate_bio: {
        Args: { p_input: string; p_is_required?: boolean };
        Returns: string;
      };
      _app_validate_name: {
        Args: { p_input: string; p_is_required?: boolean };
        Returns: string;
      };
      _app_validate_product_advantage: {
        Args: { p_input: string };
        Returns: string;
      };
      _app_validate_product_cover_path: {
        Args: { p_input: string; p_product_id: string };
        Returns: string;
      };
      _app_validate_product_description: {
        Args: { p_input: string };
        Returns: string;
      };
      _app_validate_product_faq_answer: {
        Args: { p_input: string };
        Returns: string;
      };
      _app_validate_product_faq_question: {
        Args: { p_input: string };
        Returns: string;
      };
      _app_validate_product_instructions: {
        Args: { p_input: string };
        Returns: string;
      };
      _app_validate_product_price: {
        Args: { p_input: number };
        Returns: string;
      };
      _app_validate_product_title: {
        Args: { p_input: string };
        Returns: string;
      };
      _app_validate_social_media_link: {
        Args: {
          p_link: string;
          p_type: Database["public"]["Enums"]["social_media_type"];
        };
        Returns: string;
      };
      _app_validate_text: {
        Args: {
          p_allow_newlines?: boolean;
          p_field_name: string;
          p_input: string;
          p_is_required?: boolean;
          p_max_length: number;
          p_min_length: number;
        };
        Returns: string;
      };
      _app_validate_url: { Args: { p_input: string }; Returns: string };
      _app_validate_username: { Args: { p_input: string }; Returns: string };
      _app_validation_constants: { Args: never; Returns: Json };
      app_check_product_title_availability: {
        Args: { p_exclude_product_id?: string; p_title: string };
        Returns: undefined;
      };
      app_check_username_availability: {
        Args: { p_username: string };
        Returns: undefined;
      };
      app_create_password_reset_otp_event: {
        Args: { p_client_ip?: string; p_user_agent?: string; p_user_id: string };
        Returns: undefined;
      };
      app_create_product: {
        Args: {
          p_advantages?: Json;
          p_category_l1_id: string;
          p_category_l2_id: string;
          p_description: string;
          p_faq?: Json;
          p_instructions: string;
          p_is_active?: boolean;
          p_price: number;
          p_title: string;
        };
        Returns: string;
      };
      app_create_product_comment: {
        Args: { p_comment: string; p_product_id: string; p_rating: number };
        Returns: undefined;
      };
      app_get_my_products: {
        Args: {
          p_cursor?: Json;
          p_limit?: number;
          p_sort?: Database["public"]["Enums"]["owner_product_sort_option"];
          p_status?: string;
        };
        Returns: {
          category: Json;
          comments_count: number;
          cover_url: string;
          created_at: string;
          has_more: boolean;
          id: string;
          is_active: boolean;
          next_cursor: Json;
          price: number;
          rating: number;
          title: string;
          updated_at: string;
        }[];
      };
      app_product_comments: {
        Args: { p_page?: number; p_product_id: string; p_rating?: number };
        Returns: {
          author_avatar: string;
          author_id: string;
          author_name: string;
          author_username: string;
          comment: string;
          created_at: string;
          rating: number;
          total_pages: number;
        }[];
      };
      app_profile_registration_update: {
        Args: {
          p_bio: string;
          p_default_avatar_name?: string;
          p_name: string;
          p_social_medias?: Json;
          p_username: string;
        };
        Returns: undefined;
      };
      app_update_product: {
        Args: {
          p_advantages?: Json;
          p_category_l1_id?: string;
          p_category_l2_id?: string;
          p_description?: string;
          p_faq?: Json;
          p_instructions?: string;
          p_is_active?: boolean;
          p_price?: number;
          p_product_id: string;
          p_title?: string;
        };
        Returns: undefined;
      };
      app_update_profile: {
        Args: {
          p_bio?: string;
          p_default_avatar_name?: string;
          p_name: string;
          p_social_medias?: Json;
          p_use_custom_avatar?: boolean;
        };
        Returns: undefined;
      };
      get_editor_product_page: {
        Args: { p_product_id: string };
        Returns: {
          advantages: Json;
          category: Json;
          comments_count: number;
          cover_url: string;
          creator: Json;
          description: string;
          faq: Json;
          id: string;
          instructions: string;
          is_active: boolean;
          price: number;
          rating: number;
          rating_1_count: number;
          rating_2_count: number;
          rating_3_count: number;
          rating_4_count: number;
          rating_5_count: number;
          title: string;
        }[];
      };
      get_public_product_page: {
        Args: { p_product_id: string };
        Returns: {
          advantages: Json;
          category: Json;
          comments_count: number;
          cover_url: string;
          creator: Json;
          description: string;
          faq: Json;
          id: string;
          price: number;
          rating: number;
          rating_1_count: number;
          rating_2_count: number;
          rating_3_count: number;
          rating_4_count: number;
          rating_5_count: number;
          title: string;
        }[];
      };
      get_user_balance: { Args: never; Returns: number };
      is_valid_escrow_transition: {
        Args: {
          p_new_state: Database["public"]["Enums"]["escrow_state"];
          p_old_state: Database["public"]["Enums"]["escrow_state"];
        };
        Returns: boolean;
      };
      is_valid_payment_state_transition: {
        Args: {
          p_new_state: Database["public"]["Enums"]["payment_state"];
          p_old_state: Database["public"]["Enums"]["payment_state"];
        };
        Returns: boolean;
      };
      is_valid_purchase_transition: {
        Args: {
          p_new_status: Database["public"]["Enums"]["purchase_status"];
          p_old_status: Database["public"]["Enums"]["purchase_status"];
        };
        Returns: boolean;
      };
      rpc_create_purchase: { Args: { p_product_id: string }; Returns: string };
      rpc_payment_paid: {
        Args: { p_payment_amount_usd: number; p_provider_payment_id: string };
        Returns: string;
      };
      rpc_send_message: {
        Args: { p_chat_id: string; p_message_text: string };
        Returns: undefined;
      };
    };
    Enums: {
      accounting_action:
        | "payment"
        | "receipt"
        | "hold"
        | "release"
        | "earn"
        | "refund_out"
        | "refund_in"
        | "reversal";
      accounting_type: "asset" | "liability" | "equity" | "revenue" | "expense";
      billable_type: "purchase";
      escrow_state: "locked" | "released" | "refunded";
      ledger_direction: "credit" | "debit";
      ledger_event_type:
        | "purchase"
        | "purchase_complete"
        | "refund"
        | "overpay_refund"
        | "withdrawal"
        | "fee"
        | "adjustment";
      ledger_reference_type:
        | "purchase"
        | "refund"
        | "overpay_refund"
        | "withdrawal"
        | "fee_adjustment"
        | "manual_correction";
      owner_product_sort_option:
        | "title_asc"
        | "title_desc"
        | "rating_desc"
        | "rating_asc"
        | "price_desc"
        | "price_asc"
        | "popularity_desc"
        | "created_at_desc"
        | "created_at_asc";
      payment_provider: "cryptomus";
      payment_state:
        | "awaiting_payment"
        | "processing"
        | "paid"
        | "failed"
        | "locked"
        | "refunding"
        | "refunded";
      profile_security_event_type: "password_reset_otp_verified";
      profile_security_provider_type: "email" | "sms";
      purchase_status:
        | "awaiting_payment"
        | "awaiting_confirmation"
        | "completed"
        | "refund_requested"
        | "refunded"
        | "canceled";
      social_media_type: "instagram" | "tiktok" | "youtube";
      status_change_reason:
        | "payment_initiated"
        | "payment_received"
        | "buyer_confirmed"
        | "auto_completed"
        | "refund_requested_by_buyer"
        | "refund_approved"
        | "payment_failed"
        | "payment_expired"
        | "admin_action"
        | "dispute_resolved";
      system_account_code: "escrow" | "revenue" | "refunds_payable";
      user_role: "user" | "moderator" | "admin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      accounting_action: [
        "payment",
        "receipt",
        "hold",
        "release",
        "earn",
        "refund_out",
        "refund_in",
        "reversal",
      ],
      accounting_type: ["asset", "liability", "equity", "revenue", "expense"],
      billable_type: ["purchase"],
      escrow_state: ["locked", "released", "refunded"],
      ledger_direction: ["credit", "debit"],
      ledger_event_type: [
        "purchase",
        "purchase_complete",
        "refund",
        "overpay_refund",
        "withdrawal",
        "fee",
        "adjustment",
      ],
      ledger_reference_type: [
        "purchase",
        "refund",
        "overpay_refund",
        "withdrawal",
        "fee_adjustment",
        "manual_correction",
      ],
      owner_product_sort_option: [
        "title_asc",
        "title_desc",
        "rating_desc",
        "rating_asc",
        "price_desc",
        "price_asc",
        "popularity_desc",
        "created_at_desc",
        "created_at_asc",
      ],
      payment_provider: ["cryptomus"],
      payment_state: [
        "awaiting_payment",
        "processing",
        "paid",
        "failed",
        "locked",
        "refunding",
        "refunded",
      ],
      profile_security_event_type: ["password_reset_otp_verified"],
      profile_security_provider_type: ["email", "sms"],
      purchase_status: [
        "awaiting_payment",
        "awaiting_confirmation",
        "completed",
        "refund_requested",
        "refunded",
        "canceled",
      ],
      social_media_type: ["instagram", "tiktok", "youtube"],
      status_change_reason: [
        "payment_initiated",
        "payment_received",
        "buyer_confirmed",
        "auto_completed",
        "refund_requested_by_buyer",
        "refund_approved",
        "payment_failed",
        "payment_expired",
        "admin_action",
        "dispute_resolved",
      ],
      system_account_code: ["escrow", "revenue", "refunds_payable"],
      user_role: ["user", "moderator", "admin"],
    },
  },
} as const;
