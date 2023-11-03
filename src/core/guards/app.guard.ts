// import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
// import {Reflector} from '@nestjs/core';
// import {Observable} from 'rxjs';
// import {Permission} from '../../../../../../libs/shared/enums/permission.enum';
// import {CustomException} from '../../../core/exceptions/custom.exception';
// import {CacheService} from '../../../../../../libs/shared/src/shared/cache/cache.service';
// import {JwtUser} from '../entities/jwt-user-payload.entitiy';
// import {PrismaService} from "../../../../../../libs/shared/src/shared/prisma/prisma.service";
// import {ConfigService} from "@nestjs/config";
//
// @Injectable()
// export class AppGuard implements CanActivate {
//
//     constructor(private reflector: Reflector, private cacheService: CacheService, private prisma: PrismaService, private config: ConfigService) {}
//
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const body = request.body;
//         const query = request.query;
//         const user: JwtUser = request.user;
//         const permission = this.reflector.get<Permission>('permission', context.getHandler());
//
//         // console.log(permission, query, user);
//
//         if (!permission) return true;
//
//         if (permission === Permission.Mrv_Api) {
//             const key = request.headers['x-api-key'];
//             return key && key === this.config.getOrThrow('MRV_API_KEY');
//         }
//
//         if (permission === Permission.Seacostar) {
//             const key = request.headers['x-api-key'];
//             return key && key === this.config.getOrThrow('SEACOSTAR_API_KEY');
//         }
//
//         if (permission === Permission.Admin) {
//             return user.role === Role.Admin;
//         }
//
//         if (permission === Permission.Developer) {
//             return user.role === Role.Developer;
//         }
//
//         if (permission === Permission.Owner_SubOwner) {
//             return user.role === Role.Owner || user.role === Role.SubOwner;
//         }
//
//         if (permission === Permission.Admin_Developer) {
//             return user.role === Role.Developer || user.role === Role.Admin;
//         }
//
//         if (permission === Permission.Admin_All_Owners) {
//             return user.role === Role.Admin || user.role === Role.Owner || user.role === Role.MultiOwner || user.role === Role.SubOwner;
//         }
//
//         if (permission === Permission.Admin_Owner_Developer) {
//             return user.role !== Role.Vessel;
//         }
//
//         if (permission === Permission.Admin_Company_Owner) {
//             if (user.role === Role.Owner || user.role === Role.SubOwner || user.role === Role.MultiOwner) {
//                 const companyIds = user.companyId ? [user.companyId] : user.companyIds;
//                 return companyIds.includes(this.getCompanyId(query));
//             }
//             return user.role === Role.Admin;
//         }
//
//         if (permission === Permission.Own_Vessel) {
//             if (user.role === Role.Vessel) {
//                 return user.vesselId === this.getVesselId(query, body);
//             }
//             if (user.role === Role.Owner || user.role === Role.SubOwner || user.role === Role.MultiOwner) {
//                 return this.isVesselBelongToCompany(user, this.getVesselId(query, body));
//             }
//             return user.role === Role.Admin;
//         }
//
//         if (permission === Permission.Vessel_Web) {
//             if (user.role === Role.Vessel) {
//                 return user.platform === Platform.Web && user.vesselId === this.getVesselId(query, body);
//             }
//             if (user.role === Role.Owner || user.role === Role.SubOwner || user.role === Role.MultiOwner) {
//                 return this.checkPlatformAndCompany(user, this.getVesselId(query, body));
//             }
//             if (user.role === Role.Admin || user.role === Role.Developer) {
//                 return this.isUserPlatformWeb(this.getVesselId(query, body));
//             }
//         }
//
//         if (permission === Permission.Only_Vessel_Web) {
//             if (
//                 user.role === Role.Vessel &&
//                 user.platform === Platform.Web &&
//                 this.getVesselId(query, body) === user.vesselId
//             ) {
//                 return true;
//             }
//         }
//
//         return false;
//     }
//
//     async checkPlatformAndCompany(user: JwtUser, vesselId: number): Promise<boolean> {
//         return (await this.isVesselBelongToCompany(user, vesselId)) && (await this.isUserPlatformWeb(vesselId));
//     }
//
//     private async isVesselBelongToCompany(user: JwtUser, vesselId: number): Promise<boolean> {
//         const companyIds = user.companyId ? [user.companyId] : user.companyIds;
//         const key = `company${user.companyId}userIds`;
//         const vesselIds = await this.cacheService.remember({
//             key,
//             seconds: 60,
//             callback: async () => {
//                 const vessels = await this.findCompanyVessels(companyIds);
//                 return vessels.map((vessel) => vessel.id);
//             }
//         });
//         return (vesselIds as number[]).includes(vesselId);
//     }
//
//     private async findCompanyVessels(companyIds: number[]): Promise<Vessel[]> {
//         const users = await this.prisma.user.findMany({
//             where: {companyId: {in: companyIds}, deleted: false},
//             select: {vessel: true},
//         });
//         return users.map((user) => user.vessel).filter((vessel) => vessel);
//     }
//
//     private async isUserPlatformWeb(vesselId: number): Promise<boolean> {
//         const vessel = await this.prisma.vessel.findUnique({
//             where: {id: vesselId},
//             include: {user: {select: {platform: true}}},
//         });
//         return vessel && vessel.user.platform === Platform.Web;
//     }
//
//     private getVesselId(query: any, body: any) {
//         if (query.vesselId) {
//             return +query.vesselId;
//         } else if (body.vesselId) {
//             return +body.vesselId;
//         } else {
//             throw new CustomException('Body or query must contain vesselId');
//         }
//     }
//
//     private getCompanyId(query: any): number {
//         if (query.companyId) {
//             return +query.companyId;
//         } else {
//             throw new CustomException('Query must contain companyId');
//         }
//     }
// }
