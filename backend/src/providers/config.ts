import { GroupProvider } from "./local/GroupProvider"
import { JournalProvider } from "./local/JournalProvider"
import { LessonProvider } from "./local/LessonProvider"
import { RoleProvider } from "./local/RoleProvider"
import { UserProvider } from "./local/UserProvider"

export const GROUP_PROVIDER: GroupProvider = new GroupProvider()
export const LESSON_PROVIDER: LessonProvider = new LessonProvider()
export const ROLE_PROVIDER: RoleProvider = new RoleProvider()
export const USER_PROVIDER: UserProvider = new UserProvider()
export const JOURNAL_PROVIDER: JournalProvider = new JournalProvider()