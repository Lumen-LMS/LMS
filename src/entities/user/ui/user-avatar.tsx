import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import type { User } from "../model/types";

interface UserAvatarProps {
	user: User;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const sizeClasses = {
	sm: "h-8 w-8",
	md: "h-10 w-10",
	lg: "h-16 w-16",
};

export function UserAvatar({ user, size = "md", className }: UserAvatarProps) {
	const initials = `${user.firstName[0]}${user.lastName[0]}`;

	return (
		<Avatar className={`${sizeClasses[size]} ${className || ""}`}>
			<AvatarImage
				src={user.avatarUrl}
				alt={`${user.firstName} ${user.lastName}`}
			/>
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
}
