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
            referencedRelation: "purchases";
            referencedColumns: ["id"];
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
            referencedRelation: "chats";
            referencedColumns: ["id"];
          },
        ];
      };
      escrows: {
        Row: {
          amount_usd: string;
          buyer_id: string;
          created_at: string;
          id: string;
          purchase_id: string;
          resolved_at: string | null;
          seller_id: string;
          state: Database["public"]["Enums"]["escrow_state"];
        };
        Insert: {
          amount_usd: string;
          buyer_id: string;
          created_at?: string;
          id?: string;
          purchase_id: string;
          resolved_at?: string | null;
          seller_id: string;
          state: Database["public"]["Enums"]["escrow_state"];
        };
        Update: {
          amount_usd?: string;
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
            referencedRelation: "purchases";
            referencedColumns: ["id"];
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
      ledger_entries: {
        Row: {
          amount_usd: string;
          created_at: string;
          direction: Database["public"]["Enums"]["ledger_direction"];
          id: string;
          reason: Database["public"]["Enums"]["ledger_reason"];
          reference_id: string;
          user_id: string;
        };
        Insert: {
          amount_usd: string;
          created_at?: string;
          direction: Database["public"]["Enums"]["ledger_direction"];
          id?: string;
          reason: Database["public"]["Enums"]["ledger_reason"];
          reference_id: string;
          user_id: string;
        };
        Update: {
          amount_usd?: string;
          created_at?: string;
          direction?: Database["public"]["Enums"]["ledger_direction"];
          id?: string;
          reason?: Database["public"]["Enums"]["ledger_reason"];
          reference_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ledger_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ledger_entries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "public_profiles_full_view";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_intents: {
        Row: {
          created_at: string;
          expected_amount_usd: string;
          id: string;
          overpaid_amount_usd: string | null;
          paid_amount_usd: string | null;
          payment_state: Database["public"]["Enums"]["payment_state"];
          provider: string;
          provider_payment_id: string | null;
          purchase_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          expected_amount_usd: string;
          id?: string;
          overpaid_amount_usd?: string | null;
          paid_amount_usd?: string | null;
          payment_state: Database["public"]["Enums"]["payment_state"];
          provider: string;
          provider_payment_id?: string | null;
          purchase_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          expected_amount_usd?: string;
          id?: string;
          overpaid_amount_usd?: string | null;
          paid_amount_usd?: string | null;
          payment_state?: Database["public"]["Enums"]["payment_state"];
          provider?: string;
          provider_payment_id?: string | null;
          purchase_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_intents_purchase_id_fkey";
            columns: ["purchase_id"];
            isOneToOne: true;
            referencedRelation: "purchases";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_provider_events: {
        Row: {
          id: string;
          payment_intent_id: string | null;
          processed_at: string | null;
          provider: string;
          provider_event_id: string;
          raw_payload: Json;
          received_at: string;
        };
        Insert: {
          id?: string;
          payment_intent_id?: string | null;
          processed_at?: string | null;
          provider: string;
          provider_event_id: string;
          raw_payload: Json;
          received_at?: string;
        };
        Update: {
          id?: string;
          payment_intent_id?: string | null;
          processed_at?: string | null;
          provider?: string;
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
      products: {
        Row: {
          category: Database["public"]["Enums"]["product_category"];
          comments_count: number;
          cover_url: string | null;
          created_at: string;
          created_by: string;
          description: string;
          fts: unknown;
          id: string;
          is_active: boolean;
          price: string;
          rating: number;
          rating_sum: number;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: Database["public"]["Enums"]["product_category"];
          comments_count?: number;
          cover_url?: string | null;
          created_at?: string;
          created_by: string;
          description: string;
          fts?: unknown;
          id?: string;
          is_active?: boolean;
          price: string;
          rating?: number;
          rating_sum?: number;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: Database["public"]["Enums"]["product_category"];
          comments_count?: number;
          cover_url?: string | null;
          created_at?: string;
          created_by?: string;
          description?: string;
          fts?: unknown;
          id?: string;
          is_active?: boolean;
          price?: string;
          rating?: number;
          rating_sum?: number;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
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
            referencedRelation: "owner_products_tile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_advantages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "owner_products_view";
            referencedColumns: ["id"];
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
            referencedRelation: "products_search_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_advantages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "public_product_page_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_advantages_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "public_products_tile_view";
            referencedColumns: ["id"];
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
            referencedRelation: "owner_products_tile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_faq_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "owner_products_view";
            referencedColumns: ["id"];
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
            referencedRelation: "products_search_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_faq_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "public_product_page_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_faq_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "public_products_tile_view";
            referencedColumns: ["id"];
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
            referencedRelation: "owner_products_tile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_resources_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "owner_products_view";
            referencedColumns: ["id"];
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
            referencedRelation: "products_search_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_resources_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "public_product_page_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_resources_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: true;
            referencedRelation: "public_products_tile_view";
            referencedColumns: ["id"];
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
      purchases: {
        Row: {
          buyer_id: string;
          confirmation_deadline: string | null;
          created_at: string;
          id: string;
          is_confirmed: boolean;
          price_usd: string;
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
          price_usd: string;
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
          price_usd?: string;
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
            referencedRelation: "owner_products_tile_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "owner_products_view";
            referencedColumns: ["id"];
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
            referencedRelation: "products_search_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "public_product_page_view";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "purchases_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "public_products_tile_view";
            referencedColumns: ["id"];
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
    };
    Views: {
      owner_products_tile_view: {
        Row: {
          category: Database["public"]["Enums"]["product_category"] | null;
          comments_count: number | null;
          cover_url: string | null;
          created_at: string | null;
          creator: Json | null;
          id: string | null;
          is_active: boolean | null;
          price: string | null;
          rating: number | null;
          title: string | null;
        };
        Relationships: [];
      };
      owner_products_view: {
        Row: {
          advantages: Json | null;
          category: Database["public"]["Enums"]["product_category"] | null;
          comments_count: number | null;
          cover_url: string | null;
          created_at: string | null;
          description: string | null;
          faq: Json | null;
          id: string | null;
          instructions: string | null;
          is_active: boolean | null;
          price: string | null;
          rating: number | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          advantages?: never;
          category?: Database["public"]["Enums"]["product_category"] | null;
          comments_count?: number | null;
          cover_url?: string | null;
          created_at?: string | null;
          description?: string | null;
          faq?: never;
          id?: string | null;
          instructions?: never;
          is_active?: boolean | null;
          price?: string | null;
          rating?: number | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          advantages?: never;
          category?: Database["public"]["Enums"]["product_category"] | null;
          comments_count?: number | null;
          cover_url?: string | null;
          created_at?: string | null;
          description?: string | null;
          faq?: never;
          id?: string | null;
          instructions?: never;
          is_active?: boolean | null;
          price?: string | null;
          rating?: number | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      products_search_view: {
        Row: {
          fts: unknown;
          id: string | null;
        };
        Insert: {
          fts?: unknown;
          id?: string | null;
        };
        Update: {
          fts?: unknown;
          id?: string | null;
        };
        Relationships: [];
      };
      public_product_page_view: {
        Row: {
          advantages: Json | null;
          category: Database["public"]["Enums"]["product_category"] | null;
          comments_count: number | null;
          cover_url: string | null;
          creator: Json | null;
          description: string | null;
          faq: Json | null;
          id: string | null;
          price: string | null;
          rating: number | null;
          title: string | null;
        };
        Relationships: [];
      };
      public_products_tile_view: {
        Row: {
          category: Database["public"]["Enums"]["product_category"] | null;
          comments_count: number | null;
          cover_url: string | null;
          creator: Json | null;
          id: string | null;
          price: string | null;
          rating: number | null;
          title: string | null;
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
      _app_products_build_cursor: {
        Args: { p_sort: Database["public"]["Enums"]["product_sort_option"] };
        Returns: string;
      };
      _app_products_cursor_condition: {
        Args: {
          p_cursor: Json;
          p_sort: Database["public"]["Enums"]["product_sort_option"];
        };
        Returns: string;
      };
      _app_products_sort_clause: {
        Args: { p_sort: Database["public"]["Enums"]["product_sort_option"] };
        Returns: string;
      };
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
        Args: { p_input: string };
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
          p_category: Database["public"]["Enums"]["product_category"];
          p_description: string;
          p_faq?: Json;
          p_instructions: string;
          p_is_active?: boolean;
          p_price: string;
          p_title: string;
        };
        Returns: string;
      };
      app_filter_products: {
        Args: {
          p_category: Database["public"]["Enums"]["product_category"];
          p_cursor?: Json;
          p_limit?: number;
          p_sort?: Database["public"]["Enums"]["product_sort_option"];
        };
        Returns: {
          category: Database["public"]["Enums"]["product_category"];
          comments_count: number;
          cover_url: string;
          creator: Json;
          id: string;
          next_cursor: Json;
          price: string;
          rating: number;
          title: string;
        }[];
      };
      app_get_my_products: {
        Args: {
          p_cursor?: Json;
          p_limit?: number;
          p_sort?: Database["public"]["Enums"]["owner_product_sort_option"];
          p_status?: string;
        };
        Returns: {
          category: Database["public"]["Enums"]["product_category"];
          comments_count: number;
          cover_url: string;
          created_at: string;
          creator: Json;
          id: string;
          is_active: boolean;
          next_cursor: Json;
          price: string;
          rating: number;
          title: string;
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
      app_search_products: {
        Args: {
          p_cursor?: Json;
          p_limit?: number;
          p_query: string;
          p_sort?: Database["public"]["Enums"]["product_sort_option"];
        };
        Returns: {
          category: Database["public"]["Enums"]["product_category"];
          comments_count: number;
          cover_url: string;
          creator: Json;
          id: string;
          next_cursor: Json;
          price: string;
          rating: number;
          title: string;
        }[];
      };
      app_update_product: {
        Args: {
          p_advantages?: Json;
          p_description?: string;
          p_faq?: Json;
          p_instructions?: string;
          p_is_active?: boolean;
          p_price?: string;
          p_product_id: string;
          p_title?: string;
        };
        Returns: undefined;
      };
      app_update_profile: {
        Args: {
          p_bio?: string;
          p_default_avatar_name?: string;
          p_name?: string;
          p_social_medias?: Json;
          p_use_custom_avatar?: boolean;
        };
        Returns: undefined;
      };
      rpc_create_purchase: { Args: { p_product_id: string }; Returns: string };
      rpc_payment_paid: {
        Args: { p_payment_amount_usd: string; p_provider_payment_id: string };
        Returns: string;
      };
    };
    Enums: {
      escrow_state: "locked" | "released" | "refunded";
      ledger_direction: "credit" | "debit";
      ledger_reason:
        | "marketplace_sale"
        | "marketplace_refund"
        | "overpayment_credit"
        | "withdrawal"
        | "marketplace_purchase";
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
      payment_state:
        | "awaiting_payment"
        | "processing"
        | "paid"
        | "failed"
        | "locked"
        | "refunding"
        | "refunded";
      product_category: "Soft/Bot" | "Course" | "Community" | "Digital Material";
      product_sort_option:
        | "best_match"
        | "title_asc"
        | "title_desc"
        | "rating_desc"
        | "rating_asc"
        | "price_desc"
        | "price_asc"
        | "popularity_desc";
      profile_security_event_type: "password_reset_otp_verified";
      profile_security_provider_type: "email" | "sms";
      purchase_status:
        | "awaiting_payment"
        | "awaiting_confirmation"
        | "completed"
        | "refund_requested"
        | "refunded"
        | "canceled";
      social_media_type: "instagram" | "tiktok" | "youtube" | "x" | "discord" | "telegram" | "vk";
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
      escrow_state: ["locked", "released", "refunded"],
      ledger_direction: ["credit", "debit"],
      ledger_reason: [
        "marketplace_sale",
        "marketplace_refund",
        "overpayment_credit",
        "withdrawal",
        "marketplace_purchase",
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
      payment_state: [
        "awaiting_payment",
        "processing",
        "paid",
        "failed",
        "locked",
        "refunding",
        "refunded",
      ],
      product_category: ["Soft/Bot", "Course", "Community", "Digital Material"],
      product_sort_option: [
        "best_match",
        "title_asc",
        "title_desc",
        "rating_desc",
        "rating_asc",
        "price_desc",
        "price_asc",
        "popularity_desc",
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
      social_media_type: ["instagram", "tiktok", "youtube", "x", "discord", "telegram", "vk"],
      user_role: ["user", "moderator", "admin"],
    },
  },
} as const;
