// @flow
import Cookies from 'js-cookie'

import type { MemberKeyType } from '../types'

const MEMBER_KEY_COOKIE_NAME = 'mk'

export const getMemberKey = (): MemberKeyType => Cookies.get(MEMBER_KEY_COOKIE_NAME)
export const setMemberKey = (memberKey: MemberKeyType) => Cookies.set(MEMBER_KEY_COOKIE_NAME, memberKey, { expires: 30 })
