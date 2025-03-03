#!/bin/bash

# database를 삭제하고 이미지와 마이그레이션을 지우는 스크립트.

rm -fr srcs/database

# 프로필 사진 삭제
rm -f srcs/backend/srcs/mysite/images/profiles/*

# 모든 migrations 폴더 내에서 __init__.py를 제외한 모든 파일 삭제.
# 현재 디렉토리 이하의 migrations 폴더를 찾는다.
for migration_dir in $(find . -type d -name "migrations"); do
    # 해당 폴더 내에서 __init__.py를 제외한 파일을 삭제.
    find "$migration_dir" -maxdepth 1 -type f ! -name "__init__.py" -exec rm -f {} \;
done
