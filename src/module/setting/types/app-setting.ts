interface AppSettingItem {
    code    : string
    value   : any
}

type AppSettingKey =
    | 'logo'
    | 'name'
    | 'favicon'
    | 'loginBackdrop'
    | 'bookingBackdrop'

export type AppSetting = Record<AppSettingKey, AppSettingItem>