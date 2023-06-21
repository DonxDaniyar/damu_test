export interface Instruction {
  id: number;
  organization_id: number;
  instruction_text: string;
  instruction_video_src: null;
  is_group_accept_enabled: boolean;
  is_accept_enabled: boolean;
  is_sign_required: boolean;
}
