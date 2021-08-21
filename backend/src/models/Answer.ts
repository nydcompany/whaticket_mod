import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement
} from "sequelize-typescript";

@Table
class Answer extends Model<Answer> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  shortcut: string;

  @Column
  title: string;

  @Column
  message: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default Answer;
