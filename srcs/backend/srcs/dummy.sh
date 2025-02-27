#!/bin/sh

# 1. 이 파일을 srcs/backend/srcs 에 위치시킨다.
# 2. docker exec -it django sh # mysite 디렉터리 옆에 있어야 함.
# 3. sh dummy.sh

cd mysite
python3 manage.py shell <<EOF
from users.models import CustomUser
from follows.models import Follows
from game_records.models import OneOnOneMatch, UserOneOnOneGameRecord, TournamentMatch, UserTournamentGameRecord
import random

# 임시 사용자 추가
for i in range(1, 11):
	u = CustomUser(id=i+10, username=f'testuser{i}', email='testemail@42.fr')
	u.save()

# junhapar에게 친구 5명 추가
junhapar = CustomUser.objects.get(username='junhapar')
for i in range(1, 6):
	u = CustomUser.objects.get(username=f'testuser{i}')
	f = Follows(user=junhapar, follow_user=u)
	f.save()

# 1대1 게임 기록 생성.
for i in range(1, 5):
	u = CustomUser.objects.get(username=f'testuser{i}')
	o = OneOnOneMatch(player1=junhapar, player2=u, point1=random.randrange(1, 10), point2=random.randrange(1, 10))
	o.save()
	UserOneOnOneGameRecord(user=junhapar, one_on_one_match_id=o).save()
	UserOneOnOneGameRecord(user=u, one_on_one_match_id=o).save()

# 토너먼트 게임 기록 생성.
for i in range(1, 9):
	u1 = CustomUser.objects.get(username=f'testuser{i}')
	u2 = CustomUser.objects.get(username=f'testuser{i+1}')
	u3 = CustomUser.objects.get(username=f'testuser{i+2}')
	t = TournamentMatch(round1_player1=junhapar, round1_player2=u1, round2_player1=u2, round2_player2=u3, round3_player1=junhapar, round3_player2=u3, round4_player1=u1, round4_player2=u2, round1_point1=random.randrange(1, 10), round1_point2=random.randrange(1, 10), round2_point1=random.randrange(1, 10), round2_point2=random.randrange(1, 10), round3_point1=random.randrange(1, 10), round3_point2=random.randrange(1, 10), round4_point1=random.randrange(1, 10), round4_point2=random.randrange(1, 10))
	t.save()
	UserTournamentGameRecord(user=junhapar, tournament_match_id=t).save()
	UserTournamentGameRecord(user=u1, tournament_match_id=t).save()
	UserTournamentGameRecord(user=u2, tournament_match_id=t).save()
	UserTournamentGameRecord(user=u3, tournament_match_id=t).save()
exit
EOF
