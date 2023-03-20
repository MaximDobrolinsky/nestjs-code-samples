import { Types } from 'mongoose';
import { ProfileStatus } from '../../../@core/modules/profile/profile.enum';
import {
  CreateProfileDto,
  UpdateProfileDto,
} from '../../../@core/modules/profile';
import {
  AdminCreateProfileBodyRequest,
  AdminUpdateProfileBodyRequest,
} from '../interfaces/admin-request.interface';

export const profileMapper = {
  bodyRequestToCreateDto: (
    body: AdminCreateProfileBodyRequest | AdminUpdateProfileBodyRequest,
  ): CreateProfileDto | UpdateProfileDto => {
    const languageLevelFitler = body?.englishLevel && {
      en: body.englishLevel,
    };
    const currentStackFilter = body?.currentStack?.length > 0 && {
      currentStack: body?.currentStack.map((item) => ({
        ...item,
        skill: new Types.ObjectId(item.skill),
      })),
    };

    const otherStackFilter = body?.otherStack?.length > 0 && {
      otherStack: body.otherStack.map((item) => ({
        ...item,
        skill: new Types.ObjectId(item.skill),
      })),
    };

    const interviewersFilter = body?.interviews?.length > 0 && {
      interviews: body.interviews.map((item) => ({
        ...item,
        interviewer: new Types.ObjectId(item.interviewer),
      })),
    };

    const workExperienceFilter = body?.workExperience?.length > 0 && {
      workExperience: body.workExperience.map((item) => ({
        ...item,
        skills: item.skills.map((skill) => new Types.ObjectId(skill)),
      })),
    };

    return {
      name: body?.name,
      title: body?.title,
      level: body?.level,
      ...languageLevelFitler,
      yearsOfExperience: body?.yearsOfExperience,
      location: body?.location,
      timezone: body?.timezone,
      avaliability: body?.avaliability,
      commitment: body?.commitment,
      ...currentStackFilter,
      ...otherStackFilter,
      ...interviewersFilter,
      internalReview: body?.internalReview,
      internalExperience: body?.internalExperience,
      ...workExperienceFilter,
      educations: body?.educations,
      clientsReviews: body?.clientsReviews,
      status: ProfileStatus.DRAFT,
    };
  },
};
