import { auth } from '@/utils/auth.utils';

export interface AppBindings {
  Variables: {
    validatedParams: object;
    validatedBody: object;
    user: typeof auth.$Infer.Session.session | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}
