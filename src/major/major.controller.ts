import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { MajorService } from "./major.service";
import { CreateMajorDto } from "./dto/create-major.dto";
import { UpdateMajorDto } from "./dto/update-major.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles as Role } from "types";
import { Roles } from "@common/decorators/roles.decorator";

@Controller("major")
@UseGuards(AuthGuard, RolesGuard)
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createMajorDto: CreateMajorDto) {
    return this.majorService.create(createMajorDto);
  }
  @Get("/mock")
  mock() {
    const createMajorDto = [
      {
        thumbnail: "thanh.jpg",
        name: "Công nghệ thông tin",
        description:
          "Công nghệ thông tin là lĩnh vực nghiên cứu, thiết kế, phát triển, và quản lý hệ thống thông tin, ứng dụng phần mềm và phần cứng, cũng như các vấn đề liên quan đến xử lý và truyền thông tin.",
        number_of_credits_required: 120,
      },
      {
        thumbnail: "kinh-te.jpg",
        name: "Kinh tế học",
        description:
          "Kinh tế học là lĩnh vực nghiên cứu về cách xã hội quản lý các tài nguyên hiếm để đáp ứng nhu cầu của con người. Nó bao gồm nghiên cứu về sản xuất, phân phối và tiêu thụ hàng hóa và dịch vụ.",
        number_of_credits_required: 128,
      },
      {
        thumbnail: "ngon-ngu-hoc.jpg",
        name: "Ngôn ngữ học",
        description:
          "Ngôn ngữ học là lĩnh vực nghiên cứu về ngôn ngữ và cách con người sử dụng ngôn ngữ để giao tiếp. Nó bao gồm nghiên cứu về âm vị học, ngữ âm học, ngữ pháp, ngữ nghĩa và ngữ dụng trong các ngôn ngữ khác nhau.",
        number_of_credits_required: 112,
      },
    ];

    createMajorDto.map((m) => this.majorService.create(m));
  }

  @Get()
  findAll() {
    return this.majorService.findAll();
  }
}
