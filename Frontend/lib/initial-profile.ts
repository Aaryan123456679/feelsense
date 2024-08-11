import { currentUser } from "@clerk/nextjs/server";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "./prisma";

export const initialProfile = async ( ) => {

    const user  = await currentUser();

    if(!user){
        return (
            redirectToSignIn()
        )
    }

    const profile = db.profile.findUnique({
        where : {
            profileId : user.id,
        }
    });

    if(!!profile){
        return profile
    }

    const newProfile = await db.profile.create({
        data : {
            profileId : user.id,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.emailAddresses[0].emailAddress,
            avatarUrl : user.imageUrl,
            isChild : false,
            isParent : false,
            ParentId : '',
        }
    })

    return newProfile;
}