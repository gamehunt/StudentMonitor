let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd /hdd/Projects/StudentMonitor
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +3 frontend/src/main.ts
badd +1 frontend/src/styles.scss
badd +1 frontend/.dockerignore
badd +1 frontend/angular.json
badd +20 frontend/src/index.html
badd +1 frontend/src/app/app-routing.module.ts
badd +5 frontend/src/app/app.component.html
badd +1 frontend/src/app/app.component.scss
badd +2 frontend/src/app/services/accounts.service.spec.ts
badd +1 backend/.env
badd +1 backend/src/utils.ts
badd +130 backend/src/index.ts
badd +39 ~/.config/nvim/init.vim
badd +39 frontend/src/app/components/admin/account-manager/account-manager.component.html
badd +1 frontend/src/app/components/admin/account-manager/account-manager.component.scss
badd +1 frontend/src/app/components/admin/account-manager/account-manager.component.spec.ts
badd +20 frontend/src/app/components/admin/account-manager/account-manager.component.ts
badd +1 frontend/src/app/components/admin/account-manager/dialogs/add-account-dialog/add-account-dialog.component.html
badd +4 frontend/src/app/components/admin/account-manager/dialogs/add-account-dialog/add-account-dialog.component.ts
badd +1 backend/src/entity/Group.ts
badd +1 backend/src/entity/JournalEntry.ts
badd +1 backend/src/providers/config.ts
badd +18 backend/src/routers/GroupsRouter.ts
badd +3 shared/package.json
badd +1 .gitignore
badd +3 shared/tsconfig.json
badd +6 shared/index.ts
badd +6 ~/.config/nvim/lua/plugins.lua
badd +233389 ~/.local/state/nvim/lsp.log
argglobal
%argdel
edit frontend/src/index.html
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 30 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 179 + 105) / 210)
argglobal
enew
file NvimTree_1
balt frontend/src/index.html
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt ~/.config/nvim/init.vim
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 20 - ((19 * winheight(0) + 24) / 48)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 20
normal! 05|
wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 105) / 210)
exe 'vert 2resize ' . ((&columns * 179 + 105) / 210)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
